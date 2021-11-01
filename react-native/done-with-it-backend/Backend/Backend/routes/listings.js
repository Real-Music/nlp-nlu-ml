const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");
const path = require('path')

const store = require("../store/listings");
const categoriesStore = require("../store/categories");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const delay = require("../middleware/delay");
const listingMapper = require("../mappers/listings");
const config = require("config");
const xlsx = require('xlsx');

const viewFile = async (ws) => {
  // const file = await xlsx.readFile('./data/Attendance_Schedule_List.xls');
  // const em = await xlsx.readFile('./data/All Report.xls');

  // const ws2 = em.Sheets['Attend. Logs'];
  // console.log(em.SheetNames);

  // const ws = file.Sheets['Attendance Log'];
  // console.table(xlsx.utils.sheet_to_json(ws));

  // console.table(xlsx.utils.sheet_to_json(ws2))

  var numberPattern = /\d+/g;
  const columnRange = ws['!ref'].split(':')
  const numRange = ws['!ref'].match(numberPattern);

  const lastColumnName = columnRange[1].replace(numRange[1], '');
  const startNumber = 4;
  const fourthColumn = lastColumnName.concat(startNumber);

  // remove unwanted keys
  delete ws['!autofilter']
  delete ws['!cols']
  delete ws['!margins']
  delete ws['!merges']
  delete ws['!protect']
  delete ws['!ref']
  delete ws['!rows']
  delete ws['!type']


  const pattern = { name: [], time: [] };

  // filter data set
  const newDataRange = [];
  for (let index = 0; index < Object.keys(ws).length; index++) {
    const ele = Object.keys(ws)[index];

    if (ele !== columnRange[1]) {
      newDataRange.push(ele);
      continue;
    }
    newDataRange.push(ele);
    break;
  }

  // Get column range
  const fourthColumnRange = []
  for (let index = 0; index < newDataRange.length; index++) {
    const key = newDataRange[index];

    if (key !== fourthColumn && key[key.length - 1] == 4) {
      fourthColumnRange.push(key);
      continue;
    }

    if (key === fourthColumn) {
      fourthColumnRange.push(key);
      break;
    }
  }

  // indexer + (rowRange * nextStudentRow) + studentNameRange
  /*** 
   * rowRange is the first 3 row of the data set
   * nextStudentRow increment by 2 since on the data, we have a row for time and the next is what we want to sent
   * studentNameRange: increment by 3 since the row only contiant the Employer Id, Name and Dept
   */

  let nextStudentRow = 0;
  let studentNameRange = 0;
  let indexer = 2;
  const rowRange = fourthColumnRange.length;
  const loopCount = newDataRange.length / (3 + (fourthColumnRange.length * 2));

  const updatedData = [];
  for (let index = 0; index < loopCount; index++) {
    const studentNameSelector = indexer + (rowRange * nextStudentRow) + studentNameRange;

    const studentName = {};
    Array.from([1, 2, 3]).forEach((_, index) => {
      const studentNameKey = newDataRange[studentNameSelector + index];
      if (ws[studentNameKey]) {
        const name = Object.values(ws[studentNameKey])[0].split(':')
        studentName[name[0].trim()] = name[1].trim();
      }
    })

    const studentTimeSelector = (studentNameSelector + 3) + rowRange;
    for (let index = 0; index < rowRange; index++) {
      const studentTimeKey = newDataRange[studentTimeSelector + index];

      if (ws[studentTimeKey]) {
        const timeList = Object.values(ws[studentTimeKey]).filter(val => val.trim() != '' && val.trim() != 's');
        if (timeList.length !== 0) {
          studentName['Message'] = `Passage de ${studentName.Name} a ${timeList[timeList.length - 1].trim().slice(0, 5).replace(':', 'h')}`;
          break;
        }
      }

    }

    if (studentName.hasOwnProperty('Message'))
      updatedData.push(studentName);

    nextStudentRow += 2;
    studentNameRange += 3
  }

  return updatedData;

}


const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './test/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});
const fileFilter = (req, file, cb) => {
  if (['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const uploadfile = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter
});

const schema = {
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
};

const validateCategoryId = (req, res, next) => {
  if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
    return res.status(400).send({ error: "Invalid categoryId." });

  next();
};

router.get("/", (req, res) => {
  const listings = store.getListings();
  const resources = listings.map(listingMapper);
  res.send(resources);
});

router.post('/file', uploadfile.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Invalid file type" });
  }

  const file = await xlsx.readFile(`${__dirname.replace('routes', 'test/')}${req.file.filename}`);
  const ws = file.Sheets['Attendance Log'];

  if (!ws) {
    return res.status(400).json({ message: 'Please upload Attendance Log' });
  }

  const data = await viewFile(ws);
  const parentFile = await xlsx.readFile(`${__dirname.replace('routes', 'test/')}EMPLOYEE_PARENTS_TABLE.xlsx`);
  const wsParent = parentFile.Sheets['Feuil1'];
  const parentData = await xlsx.utils.sheet_to_json(wsParent);

  const newData = data.map(data => {
    let temp = {};
    for (parent of parentData) {
      if (Number(parent['Employee ID']) === Number(data['Employee ID'])) {
        temp = { ...data, phone: parent['Parents NUMBER'] };
        break;
      }
    }

    return temp;
  });

  // console.table(newData);
  res.status(200).send({ message: 'success', data: newData });
});

router.post('/parent', uploadfile.single('file'), async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: "Invalid file type" });
  }

  const file = await xlsx.readFile(`${__dirname.replace('routes', 'test/')}${req.file.filename}`);
  const ws = file.Sheets['Feuil1'];

  if (!ws) {
    return res.status(400).json({ message: 'Please upload parent data' });
  }

  const data = await xlsx.utils.sheet_to_json(ws);

  console.table(data)
  return res.status(200).send({
    message: 'success',
    data,
  });
});

router.get('/parent', async (req, res) => {
  const file = await xlsx.readFile(`${__dirname.replace('routes', 'test/')}EMPLOYEE_PARENTS_TABLE.xlsx`);
  const ws = file.Sheets['Feuil1'];
  const data = await xlsx.utils.sheet_to_json(ws);

  return res.status(200).send({
    message: 'success',
    data,
  });
});

router.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    upload.array("images", config.get("maxImageCount")),
    validateWith(schema),
    validateCategoryId,
    imageResize,
  ],

  async (req, res) => {
    // console.log()
    const listing = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      description: req.body.description,
    };
    listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.body.location) listing.location = JSON.parse(req.body.location);
    if (req.user) listing.userId = req.user.userId;

    store.addListing(listing);

    res.status(201).send(listing);
  }
);

module.exports = router;
