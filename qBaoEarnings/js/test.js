/**
 * Created by xiaoxiangmin on 2017/12/15.
 */


function cal(days, total) {
    //var total = 600674.82;      //总数
    var totals = Number(total);
    var dailyIncome = 0;            //每日签到总收益

    var dailyAssistantFee = 6;               //每日订阅助手费用 ,固定6元

    var dailyAccountManagementFee = 0;          //每日账户管理费


    var allIncome = 0;            //查询时间内的每日签到总收益汇总
    var allAssistantFee = 6;               //查询时间内的订阅助手费用汇总；
    var allAccountManagementFee = 0;          //查询时间内的账户管理费汇总
    var monthAccountManagementFee = 0;          //每月的账户管理费汇总

    var behavioralInterestRates = 0.0002;        //行为酬劳系数，0.02%
    var fixedBouns = 0;                //固定奖励比例，0.036%
    var fixedBounsPer = 0;                //固定奖励比例，0.036%
    var wagesReward = 0.0006;                //工资奖励比列，0.06%

    var BIR = 0;    //每日行为奖励
    var FB = 0;     //每日签到工资奖励
    var WR = 0;     //每日签到固定收益

    var dailyRewardDetails = [];    //每天收益明细

    var allDaily = [];       //每日签到总收益及手续费
    //var allDays = {};       //查询时间内的所有收益及手续费

    //保留两位小数点，不四舍五入
    function point(num) {
        return Math.floor(num * 100) / 100
    }

    for (var i = 0; i < days; i++) {

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

        //数据助手费用是每天的凌晨3点扣除，本程序默认每天签到扣除手续费。
        totals = totals.subtr(dailyAssistantFee);

        /*if (days / 30) {
            totals = totals.subtr(monthAccountManagementFee);
            monthAccountManagementFee = 0;
        }*/

        //每日签到收益 = 总资产 * （行业酬劳比例+固定奖励比例+工资奖励比例）；
        BIR = point(totals.mul(behavioralInterestRates));
        FB = point(totals.mul(fixedBouns));
        WR = point(totals.mul(wagesReward));

        //console.log("BIR:" + BIR + ",FB:" + FB + ",WR" + WR);

        dailyIncome = (BIR.add(FB)).add(WR);
        //console.log(typeof dailyIncome+"-totals:"+dailyIncome);

        allIncome = (allIncome.add(dailyIncome));       //每日的收益汇总，扣除数据助手费用
        //console.log(typeof allIncome+"-dailyIncome:"+allIncome);

        totals = (totals.add(dailyIncome));     //每日的总资产

        //账户管理费=日余额*0.01/365
        dailyAccountManagementFee = point((totals.mul(0.01)).div(365));
        allAccountManagementFee = point(allAccountManagementFee.add(dailyAccountManagementFee));
        monthAccountManagementFee = point(monthAccountManagementFee.add(monthAccountManagementFee));
        //console.log(typeof monthAccountManagementFee);


        allDaily[i] = {
            days: '第' + (i + 1) + '天',
            totals: totals,
            dailyIncome: dailyIncome,
            dailyAccountManagementFee: dailyAccountManagementFee,
            dailyAssistantFee: dailyAssistantFee
        };

        dailyRewardDetails = [
            {BIR: BIR, FB: FB, WR: WR}
        ];

        //console.log("第" + (i + 1) + "天，日收益：" + dailyIncome + ",总：" + totals + ",账户管理费：" + dailyAccountManagementFee + ",月管理费：" + allAccountManagementFee + ",数据助手：" + dailyAssistantFee);
    }
    //console.log(all[0].days);

    //查询时间内的所有收益及手续费
    var allDays = [
        {name: '总资产', value: totals, type: true},
        {name: '总收益', value: allIncome, type: true},
        {name: '总数据助手费', value: allAssistantFee * days, type: true},
        {name: '总账户管理费', value: allAccountManagementFee, type: true},
        {name: '行为酬劳', value: "0.02%", type: false},
        {name: '工资奖励', value: "0.06%", type: false},
        {name: '固定奖励', value: fixedBounsPer, type: false}
    ];

    return {
        allDaily: allDaily,
        allDays: allDays,
        dailyRewardDetails: dailyRewardDetails
    };
}

//cal(16,600674.82);