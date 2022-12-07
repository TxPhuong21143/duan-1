import '../css/Analysis.css'
import { MdProductionQuantityLimits } from "react-icons/md";
import { SlPresent } from "react-icons/sl";
import { MdOutlineInventory2 } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import Chart from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import adminApi from '../api/AdminApi';

const analysis = {
    Analysis: ({ lenguage }) => {
        const chartBillThisYear = useRef(0)
        const chartProfitThisYear = useRef(0)

        const [analysisData, setAnalysisData] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getAnalysisData()
                setAnalysisData(data)
            }
            getData()
        }, [])

        useEffect(() => {
            let totalBill
            let resultProfit
            if (analysisData) {
                console.log(analysisData)
                totalBill = analysisData.totalBillMonth
                resultProfit = analysisData.analysisProfit12Month
                const chart = new Chart(chartBillThisYear.current.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: [lenguage.sixdo.analysis.chartTimeLine.January, lenguage.sixdo.analysis.chartTimeLine.February, lenguage.sixdo.analysis.chartTimeLine.March, lenguage.sixdo.analysis.chartTimeLine.April, lenguage.sixdo.analysis.chartTimeLine.May, lenguage.sixdo.analysis.chartTimeLine.June, lenguage.sixdo.analysis.chartTimeLine.July, lenguage.sixdo.analysis.chartTimeLine.August, lenguage.sixdo.analysis.chartTimeLine.September, lenguage.sixdo.analysis.chartTimeLine.October, lenguage.sixdo.analysis.chartTimeLine.November, lenguage.sixdo.analysis.chartTimeLine.December,],
                        datasets: [{
                            label: lenguage.sixdo.analysis.chartTitle,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: [totalBill[0], totalBill[1], totalBill[2], totalBill[3], totalBill[4], totalBill[5], totalBill[6], totalBill[7], totalBill[8], totalBill[9], totalBill[10], totalBill[11], totalBill[12]]
                        }]
                    },
                }, [lenguage]);
                const chart2 = new Chart(chartProfitThisYear.current.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: [lenguage.sixdo.analysis.chartTimeLine.January, lenguage.sixdo.analysis.chartTimeLine.February, lenguage.sixdo.analysis.chartTimeLine.March, lenguage.sixdo.analysis.chartTimeLine.April, lenguage.sixdo.analysis.chartTimeLine.May, lenguage.sixdo.analysis.chartTimeLine.June, lenguage.sixdo.analysis.chartTimeLine.July, lenguage.sixdo.analysis.chartTimeLine.August, lenguage.sixdo.analysis.chartTimeLine.September, lenguage.sixdo.analysis.chartTimeLine.October, lenguage.sixdo.analysis.chartTimeLine.November, lenguage.sixdo.analysis.chartTimeLine.December,],
                        datasets: [{
                            label: lenguage.sixdo.analysis.chartTitle2,
                            // backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: [resultProfit[0].resultProfit ? resultProfit[0].resultProfit : 0,
                            resultProfit[1].resultProfit ? resultProfit[1].resultProfit : 0, resultProfit[2].resultProfit ? resultProfit[2].resultProfit : 0, resultProfit[3].resultProfit ? resultProfit[3].resultProfit : 0, resultProfit[4].resultProfit ? resultProfit[4].resultProfit : 0, resultProfit[5].resultProfit ? resultProfit[5].resultProfit : 0, resultProfit[6].resultProfit ? resultProfit[6].resultProfit : 0, resultProfit[7].resultProfit ? resultProfit[7].resultProfit : 0, resultProfit[8].resultProfit ? resultProfit[8].resultProfit : 0, resultProfit[9].resultProfit ? resultProfit[9].resultProfit : 0, resultProfit[10].resultProfit ? resultProfit[10].resultProfit : 0, resultProfit[11].resultProfit ? resultProfit[11].resultProfit : 0]
                        }]
                    },
                }, [lenguage]);
            }
        },)
        return (
            <>
                <div className="admin-analysis-title">{lenguage.sixdo.shop}</div>
                <div className='quick-analysis'>
                    <div className='quick-analysis-item margin-right1'>
                        <div className='analysis-tem-content-left xy-center'>
                            <MdProductionQuantityLimits className='analysis-icon1' />
                        </div>
                        <div className='analysis-tem-content-right xy-center'>
                            <span className='analysis-detail-text1'>{analysisData ? analysisData.productCountShelling : "0"} {lenguage.sixdo.analysis.product}</span>
                            <span className='analysis-detail-text2'>{lenguage.sixdo.analysis.shelling}</span>
                        </div>
                    </div>
                    <div className='quick-analysis-item margin-right1'>
                        <div className='analysis-tem-content-left xy-center'>
                            <SlPresent className='analysis-icon2' />
                        </div>
                        <div className='analysis-tem-content-right xy-center'>
                            <span className='analysis-detail-text1'>{analysisData ? analysisData.voucherCountUsing : "0"} {lenguage.sixdo.analysis.voucher}</span>
                            <span className='analysis-detail-text2'>{lenguage.sixdo.analysis.giving}</span>
                        </div>
                    </div>
                    <div className='quick-analysis-item margin-right1'>
                        <div className='analysis-tem-content-left xy-center'>
                            <MdOutlineInventory2 className='analysis-icon1' />
                        </div>
                        <div className='analysis-tem-content-right xy-center'>
                            <span className='analysis-detail-text1'>{analysisData ? analysisData.productQuantityInventory : "0"} {lenguage.sixdo.analysis.inventory}</span>
                            <span className='analysis-detail-text2'>{lenguage.sixdo.analysis.inventoryTotal}</span>
                        </div>
                    </div>
                    <div className='quick-analysis-item'>
                        <div className='analysis-tem-content-left xy-center'>
                            <MdOutlineAccountCircle className='analysis-icon2' />
                        </div>
                        <div className='analysis-tem-content-right xy-center'>
                            <span className='analysis-detail-text1'>{analysisData ? analysisData.custumerCountActive : "0"} {lenguage.sixdo.analysis.guess}</span>
                            <span className='analysis-detail-text2'>{lenguage.sixdo.analysis.using}</span>
                        </div>
                    </div>
                </div>
                <div className='fix-magrin-bottom'></div>
                <div className='analysis-top-container'>
                    <div className='analysis-top-item margin-right1'>
                        <div className='analysis-top-item-title'>
                            {lenguage.sixdo.analysis.topTitle1}
                        </div>
                        <div className='analysis-top-item-header-row'>
                            <div className='analysis-top-product colum-code'>{lenguage.sixdo.analysis.topProduct.code}</div>
                            <div className='analysis-top-product colum-name'>{lenguage.sixdo.analysis.topProduct.name}</div>
                            <div className='analysis-top-product colum-count'>{lenguage.sixdo.analysis.topProduct.count}</div>
                            <div className='analysis-top-product colum-inventory'>{lenguage.sixdo.analysis.topProduct.inventory}</div>
                        </div>
                        {analysisData ? analysisData.top5ProductSold.map((item) => {
                            return <analysis.Top5Product item={item} />
                        }) : ""}
                        <div className='bottom-plus'></div>
                    </div>
                    <div className='analysis-top-item'>
                        <div className='analysis-top-item-title'>
                            {lenguage.sixdo.analysis.topTitle2}
                        </div>
                        <div className='analysis-top-item-header-row'>
                            <div className='analysis-top-product colum-code'>{lenguage.sixdo.analysis.topAccountBuy.code}</div>
                            <div className='analysis-top-product colum-name-kh'>{lenguage.sixdo.analysis.topAccountBuy.name}</div>
                            <div className='analysis-top-product colum-sdt'>{lenguage.sixdo.analysis.topAccountBuy.phoneNumber}</div>
                            <div className='analysis-top-product colum-totalbill'>{lenguage.sixdo.analysis.topAccountBuy.totalBill}</div>
                        </div>
                        {analysisData ? analysisData.top5AccountPaid.map((item) => {
                            return <analysis.Top5Account item={item} />
                        }) : ""}
                        <div className='bottom-plus'></div>
                    </div>
                </div>
                <div className='fix-magrin-bottom'></div>
                <div className='fix-magrin-bottom'></div>
                <canvas ref={chartBillThisYear}></canvas>
                <div className='fix-magrin-bottom'></div>
                <div className='analysis-profit-detail-by-month'>
                    <div className='analysis-profit-detail-by-month-header-row'>
                        <div className='colum-month xy-center colum-analysis-style colum-analysis-style'>{lenguage.sixdo.analysis.profitAnalysis.month}</div>
                        <div className='colum-bill-shipped colum-analysis-style xy-center'>{lenguage.sixdo.analysis.profitAnalysis.billShipped}</div>
                        <div className='colum-product-quantity colum-analysis-style xy-center'>{lenguage.sixdo.analysis.profitAnalysis.quantity}</div>
                        <div className='colum-shipped-profit colum-analysis-style xy-center'>{lenguage.sixdo.analysis.profitAnalysis.shippedProfit}</div>
                        <div className='colum-bill-back-loss-ship colum-analysis-style xy-center'>{lenguage.sixdo.analysis.profitAnalysis.billBack}</div>
                        <div className='colum-back-loss-ship-total colum-analysis-style xy-center'>{lenguage.sixdo.analysis.profitAnalysis.backLoss}</div>
                        <div className='colum-profit colum-analysis-style xy-center'>{lenguage.sixdo.analysis.profitAnalysis.totalProfit}</div>
                    </div>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.January} item={analysisData?analysisData.analysisProfit12Month[0]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.February} item={analysisData?analysisData.analysisProfit12Month[1]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.March} item={analysisData?analysisData.analysisProfit12Month[2]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.April} item={analysisData?analysisData.analysisProfit12Month[3]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.May} item={analysisData?analysisData.analysisProfit12Month[4]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.June} item={analysisData?analysisData.analysisProfit12Month[5]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.July} item={analysisData?analysisData.analysisProfit12Month[6]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.August} item={analysisData?analysisData.analysisProfit12Month[7]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.September} item={analysisData?analysisData.analysisProfit12Month[8]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.October} item={analysisData?analysisData.analysisProfit12Month[9]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.November} item={analysisData?analysisData.analysisProfit12Month[10]:""}/>
                    <analysis.RowProfit month={lenguage.sixdo.analysis.chartTimeLine.December} item={analysisData?analysisData.analysisProfit12Month[11]:""}/>
                    <div className='fix-magrin-bottom'></div>
                </div>
                <div className='fix-magrin-bottom'></div>
                <canvas ref={chartProfitThisYear}></canvas>
                <div className='fix-magrin-bottom'></div>
                <div className='fix-magrin-bottom'></div>
                <div className='fix-magrin-bottom'></div>
            </>
        )
    },
    RowProfit: ({ month ,item}) => {
        return (
            <>
                <div className='analysis-profit-row'>
                    <div className='colum-month column-analysis-profit-detail xy-center'>{month}</div>
                    <div className='colum-bill-shipped column-analysis-profit-detail xy-center'>{item.shippedBillTotal}</div>
                    <div className='colum-product-quantity column-analysis-profit-detail xy-center'>{item.soldTotal}</div>
                    <div className='colum-shipped-profit column-analysis-profit-detail xy-center'>{item.profitBefore}</div>
                    <div className='colum-bill-back-loss-ship column-analysis-profit-detail xy-center'>{item.backBillTotal}</div>
                    <div className='colum-back-loss-ship-total column-analysis-profit-detail xy-center'>{item.shipLossTotal}</div>
                    <div className='colum-profit column-analysis-profit-detail xy-center'>{item.resultProfit}</div>
                </div>
            </>
        )
    },
    Top5Product: ({ item }) => {
        return (
            <>
                <div className='analysis-top-product-item-row'>
                    <div className='colum-code xy-center'>{item.idProduct}</div>
                    <div className='colum-name xy-center'>{item.name}</div>
                    <div className='colum-count xy-center'>{item.sold}</div>
                    <div className='colum-inventory xy-center'>{item.inventory}</div>
                </div>
            </>
        )
    },
    Top5Account: ({ item }) => {
        return (
            <>
                <div className='analysis-top-product-item-row'>
                    <div className='colum-code xy-center'>{item.idAccount}</div>
                    <div className='colum-name-kh xy-center'>{item.name}</div>
                    <div className='colum-sdt xy-center'>{item.sdt}</div>
                    <div className='colum-totalbill xy-center'>{item.totalPaid}</div>
                </div>
            </>
        )
    }
}

export default analysis