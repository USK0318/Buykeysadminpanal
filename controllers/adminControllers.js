

function dashboard(req, res) {
    res.render('dashboard', { title: 'Dashboard' });
}

function customerdetails(req, res) {
    res.render('customerdetails', { title: 'Customer Details' });
}

function loandetails(req, res) {
    res.render('loandetails', { title: 'Loan Details' });
}

function loanrequest(req, res) {
    res.render('loanrequest', { title: 'Loan Request' });
}

function activeloan(req, res) {
    res.render('activeloan', { title: 'Active Loan' });
}

function executive(req, res) {
    res.render('executive', { title: 'Executive' });
}

function categories(req, res) {
    res.render('categories', { title: 'Categories' });
}

function autopayment(req, res) {
    res.render('autopayment', { title: 'Auto Payment' });
}

function precloseEMI(req, res) {
    res.render('precloseEMI', { title: 'Pre Close EMI' });
}

function setting(req, res) {
    res.render('setting', { title: 'Setting' });
}

function twowheeler(req, res) {
    res.render('twowheeler', { title: 'Two Wheeler Lone Customer Details' });
}

function fourwheeler(req, res) {
    res.render('fourwheeler', { title: 'Four Wheeler Loan Customer Details' }); 
}

function homeappliances(req, res) {
    res.render('homeappliances', { title: 'Home Appliances Loan Customer Details' });
}

function customerprofile(req, res) {
    res.render('customerprofile', { title: 'Customer Details' });
}

function customerprofileedit(req, res) {
    res.render('customerprofileedit', { title: 'Customer Details' });
}

function login(req, res) {
    res.render('login', { title: 'Login' });
}

function bankdetails(req,res){
    res.render('bankdetails', { title: 'Bank Details' });
}

function pandetails(req,res){
    res.render('pandetals', { title: 'Pan Details' });
}

function executiveone(req, res) {
    res.render('executivedetails', { title: 'Executive' });
}

function createassociateaccount(req, res) {
    res.render('associateaccount', { title: 'Create Associate Account' });
}

function userprofile(req, res) {
    res.render('userprofile', { title: 'User Profile' });
}

function blog(req, res) {
    res.render('blog', { title: 'Blog' });
}

function faq(req, res) {
    res.render('faq', { title: 'FAQ' });
}

function arts(req,res){
    res.render('arts' , { title: 'Arts'})
}
function alldata(req ,res){
    res.render('alldata' , { title: 'All Data'})
}

module.exports = {
     dashboard
    , customerdetails
    , loandetails
    , loanrequest
    , activeloan
    , executive
    , categories
    , autopayment
    , precloseEMI
    , setting
    , twowheeler
    , fourwheeler
    , homeappliances
    , customerprofile
    , customerprofileedit
    , login
    ,bankdetails
    ,pandetails
    ,executiveone
    ,createassociateaccount
    ,userprofile
    ,blog
    ,faq
    ,arts
    ,alldata

}
