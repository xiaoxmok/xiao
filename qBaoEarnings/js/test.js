/**
 * Created by xiaoxiangmin on 2017/12/15.
 */


function cal(date) {
    var total = 600674.82;      //总数
    var dailyIncome = 0;            //每日收益
    var dailyAssistantFee = 6;               //每日订阅助手费用 ,固定6元；
    var dailyAccountManagementFee = 0;          //每日账户管理费
    var monthAccountManagementFee = 0;          //每月账户管理费

    var behavioralInterestRates = 0.0002;        //行为酬劳系数，0.02%
    var fixedBouns = 0.00036;                //固定奖励比例，0.036%
    var wagesReward = 0.0006;                //工资奖励比列，0.06%


    for (var i = date; i > 0; i--) {
        //每日收益 = 总资产 * （行业酬劳比例+固定奖励比例+工资奖励比例） - 每日助手费用；
        dailyIncome = Number((total * (behavioralInterestRates + fixedBouns + wagesReward)).toFixed(2));

        total = Number((total + dailyIncome - dailyAssistantFee).toFixed(2));

        //账户管理费=日余额*0.01/365
        dailyAccountManagementFee = Number((total * 0.01 / 365).toFixed(2));
        monthAccountManagementFee = Number((monthAccountManagementFee + dailyAccountManagementFee).toFixed(2));
        console.log(typeof monthAccountManagementFee);

        console.log("第" + i + "天，日收益：" + dailyIncome + ",总：" + total + ",账户管理费：" + dailyAccountManagementFee + ",月管理费：" + monthAccountManagementFee);
    }

}

cal(16);