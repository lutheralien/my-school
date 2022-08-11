const getIp = (req, res, next) => {
    let ipAddr = req.connection.remoteAddress;    
    if (req.headers && req.headers['x-forwarded-for']) {
   [ipAddr] = req.headers['x-forwarded-for'].split(',');
   console.log(ipAddr);
   req.ip = ipAddr
next()
 } else {
  next()
 }

}
   
module.exports = { getIp };
    