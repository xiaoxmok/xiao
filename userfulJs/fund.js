
/**
 * 年化定投
 * @param {*} num 每年定投金额
 * @param {*} year 年份
 * @param {*} income 年化收益率，number类型，
 */
function fund(num, year, income) {
  let total = 0
  for (let i = 1; i <= year; i++) {
    total += num
    total += total * (income/100)
  }
  return total
}
console.log('fund', fund(1000000, 20, 5))


/**
 * 计算
 * @param {*} amount 本金
 * @param {*} interest 年利率 （%）
 * @param {*} year 年限
 */
function test(amount, interest, year) {
  const total = amount + (amount * interest)
  if (year > 1) {
    year--
    return test(total, interest, year)
  } else {
    return total
  }
}
console.log('test', test(1000000, 0.05, 20))