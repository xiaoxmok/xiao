/**
 * Created by xiaoxiangmin on 2017/12/15.
 */

/*
602027.11

第1天，日收益：698.33,总：602719.44,账户管理费：16.51,月管理费：16.51,数据助手：6
第2天，日收益：699.13,总：603412.57,账户管理费：16.53,月管理费：33.04,数据助手：6
第3天，日收益：699.94,总：604106.51,账户管理费：16.55,月管理费：49.59,数据助手：6
第4天，日收益：700.75,总：604801.26,账户管理费：16.56,月管理费：66.15,数据助手：6
第5天，日收益：701.54,总：605496.8,账户管理费：16.58,月管理费：82.73,数据助手：6
第6天，日收益：702.35,总：606193.15,账户管理费：16.6,月管理费：99.33,数据助手：6
第7天，日收益：703.16,总：606890.31,账户管理费：16.62,月管理费：115.95,数据助手：6
第8天，日收益：703.97,总：607588.28,账户管理费：16.64,月管理费：132.59,数据助手：6
第9天，日收益：704.77,总：608287.05,账户管理费：16.66,月管理费：149.25,数据助手：6
第10天，日收益：705.59,总：608986.64,账户管理费：16.68,月管理费：165.93,数据助手：6
第11天，日收益：706.4,总：609687.04,账户管理费：16.7,月管理费：182.63,数据助手：6
第12天，日收益：707.21,总：610388.25,账户管理费：16.72,月管理费：199.35,数据助手：6
第13天，日收益：708.02,总：611090.27,账户管理费：16.74,月管理费：216.09,数据助手：6
第14天，日收益：708.85,总：611793.12,账户管理费：16.76,月管理费：232.85,数据助手：6
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

    var outputText ='';

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
        outputText += "第" + (i + 1) + "天，日收益：" + dailyIncome + ",总：" + totals + ",账户管理费：" + dailyAccountManagementFee + ",月管理费：" + allAccountManagementFee + ",数据助手：" + dailyAssistantFee +"\n";
    }
    //console.log(all[0].days);
    console.log(outputText);

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