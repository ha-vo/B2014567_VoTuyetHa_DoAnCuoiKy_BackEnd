const express = require('express');
const cors = require('cors');
const KhachHangRoute = require('./src/routes/khachhang.route.js')
const NhanVienRoute = require('./src/routes/nhanvien.route.js')
const DatHangRoute = require('./src/routes/dathang.route.js')
const ChiTietDatHangRoute = require('./src/routes/chitietdathang.route.js')
const HangHoaRoute = require('./src/routes/hanghoa.route.js')
const HinhHHRoute = require('./src/routes/hinhhh.route.js')

const ApiError = require('./src/api-code.js')

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Wellcome to Ban My Pham application" })
});

app.use('/api/nhanvien', NhanVienRoute)
app.use('/api/khachhang', KhachHangRoute)
app.use('/api/hinhhh', HinhHHRoute)
app.use('/api/dathang', DatHangRoute)
app.use('/api/chitietdathang', ChiTietDatHangRoute)
app.use('/api/hanghoa', HangHoaRoute)


app.use((req, res, next) => {
    return next(new ApiError(404, "resource not found"))
})

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({ message: err.message || 'internal server error' })
})

module.exports = app;