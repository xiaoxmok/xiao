/**
 * Created by xiaoxiangmin on 2017/12/15.
 */


function cal(days, total) {
    //var total = 600674.82;      //总数
    var totals = Number(total);
    var dailyIncome = 0;            //每日收益

    var dailyAssistantFee = 6;               //每日订阅助手费用 ,固定6元

    var dailyAccountManagementFee = 0;          //每日账户管理费


    var allIncome = 0;            //查询时间内的所有收益
    var allAssistantFee = 6;               //查询时间内的所有订阅助手费用；
    var allAccountManagementFee = 0;          //查询时间内的所有账户管理费

    var behavioralInterestRates = 0.0002;        //行为酬劳系数，0.02%
    var fixedBouns = 0;                //固定奖励比例，0.036%
    var fixedBounsPer = 0;                //固定奖励比例，0.036%
    var wagesReward = 0.0006;                //工资奖励比列，0.06%


    var allDaily = [];       //每日收益及手续费
    //var allDays = {};       //查询时间内的所有收益及手续费


    for (var i = 0; i <= days; i++) {

        switch (true) {
            //固定奖励比例，0<x<2W
            case 0 < totals && totals < 20000 :
                fixedBouns = 0.00015;
                fixedBounsPer = "0.015%";
                break;
            case 20000 <= totals && totals < 40000:
                fixedBouns = 0.00016;
                fixedBounsPer = "0.016%";
                break;
            case 40000 <= totals && totals < 80000:
                fixedBouns = 0.00018;
                fixedBounsPer = "0.018%";
                break;
            case 80000 <= totals && totals < 120000:
                fixedBouns = 0.00024;
                fixedBounsPer = "0.024%";
                break;
            case 120000 <= totals && totals < 200000:
                fixedBouns = 0.00027;
                fixedBounsPer = "0.027%";
                break;
            case 200000 <= totals && totals < 500000:
                fixedBouns = 0.00031;
                fixedBounsPer = "0.031%";
                break;
            case 500000 <= totals && totals < 1000000:
                fixedBouns = 0.00036;
                fixedBounsPer = "0.036%";
                break;
            case 1000000 <= totals:
                fixedBouns = 0.0004;
                fixedBounsPer = "0.04%";
                break;
        }

        //每日收益 = 总资产 * （行业酬劳比例+固定奖励比例+工资奖励比例） - 每日助手费用；
        dailyIncome = Number((totals * (behavioralInterestRates + fixedBouns + wagesReward)).toFixed(2));

        allIncome = Number((allIncome + dailyIncome - dailyAssistantFee).toFixed(2));       //每日的收益汇总，扣除数据助手费用

        totals = Number((totals + dailyIncome - dailyAssistantFee).toFixed(2));     //每日的总资产

        //账户管理费=日余额*0.01/365
        dailyAccountManagementFee = Number((totals * 0.01 / 365).toFixed(2));
        allAccountManagementFee = Number((allAccountManagementFee + dailyAccountManagementFee).toFixed(2));
        //console.log(typeof monthAccountManagementFee);


        allDaily[i] = {
            days: '第' + (i + 1) + '天',
            totals: totals,
            dailyIncome: dailyIncome,
            dailyAccountManagementFee: dailyAccountManagementFee,
            dailyAssistantFee: dailyAssistantFee
        };

        //console.log("第" + (i + 1) + "天，日收益：" + dailyIncome + ",总：" + totals + ",账户管理费：" + dailyAccountManagementFee + ",月管理费：" + allAccountManagementFee + ",数据助手：" + dailyAssistantFee);
    }
    //console.log(all[0].days);

    //查询时间内的所有收益及手续费
    var allDays = [

        {name: '总资产', value: totals, type: true},
        {name: '总收益', value: allIncome, type: true},
        {name: '总数据助手费', value: allAssistantFee*days, type: true},
        {name: '总账户管理费', value: allAccountManagementFee, type: true},
        {name: '行为酬劳', value: "0.02%", type: false},
        {name: '工资奖励', value: "0.06%", type: false},
        {name: '固定奖励', value: fixedBounsPer, type: false}
    ];

    return {
        allDaily: allDaily,
        allDays: allDays
    };
}

//cal(16,600674.82);