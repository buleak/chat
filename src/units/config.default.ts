
let baseUrl = null;
const testBaseUrl = 'http://localhost:7001'
const productionBaseUrl = 'http://buleak.top:7001'
const developmentBaseUrl = 'http://localhost:7001'
if (process.env.NODE_ENV === 'test') { // 测试环境
    baseUrl = testBaseUrl
}else if (process.env.NODE_ENV === 'production') { // 生产环境
    baseUrl = productionBaseUrl
}else if (process.env.NODE_ENV === 'development') { // 开发环境
    baseUrl = developmentBaseUrl
} 
export const baseURL = baseUrl;

