<html>
<head>
</head>
<body style="-ms-word-wrap: break-word;">?

    <style>
        .FourColFormatter {
    float: left;
    width: 12%;
            margin-right: 5px;
            line-height: 22px;
        }

        .FourColPercentColWidthLabel {
    float: left;
    width: 12%;
            line-height: 22px;
        }

        .ThreeColPercentWidthLabel {
    float: left;
    width: 30%;
            line-height: 22px;
        }

        .ThreeColFormatter {
    float: left;
    width: 30%;
            margin-right: 5px;
            line-height: 22px;
        }

        .FixedWidthInput {
    width: 120px;
    height: 22px;
        }

        .BscsFixedWidthInput {
    width: 60px;
    height: 22px;
        }

        .TableFormatter {
            font-family: 'Segoe UI';
            font-size: large;
        }

        .GridContentCentre {
            align-content: center;
            align-items: center;
        }
    </style>


    ?<div id="container" style="font-family: undefined;" rtl-dir="{{direct}}" ng-controller="adjustmentTypeController">
        <div class="formContent" disable-all-contents="workflowContext.IsOnlyPreviewAvailable">
            <table style="width: 100%;">
                <tbody>
                    <tr>
                        <td>
                            <div class="dataGridTitleText dataGridTitleTextUnderlined"><span>{{scopeData.translations.tAdjustmentType}}</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tAdjustmentType}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.SelectedAdjustmentType" ng-options="AdjustmentType.Text for AdjustmentType in scopeData.AdjustmentTypeList" ng-change="scopeData.OnAdjustmentSelectionChange(scopeData.SelectedAdjustmentType)">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel"></td>
                                        <td class="FourColFormatter"></td>

                                        <td class="FourColPercentColWidthLabel"></td>
                                        <td class="FourColFormatter"></td>

                                        <td class="FourColPercentColWidthLabel"></td>
                                        <td class="FourColFormatter"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="width: 100%;" ng-show="scopeData.AdjustmentDetailDiv">
                <tbody>
                    <tr>
                        <td>
                            <div class="dataGridTitleText dataGridTitleTextUnderlined"><span>{{scopeData.translations.tAdjustmentDetail}}</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tOrigin}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.SelectedOrigin" ng-options="Origin.Text for Origin in scopeData.OriginList" ng-change="scopeData.OnOriginSelectionChange(scopeData.SelectedOrigin)">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tReason}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.SelectedReason" ng-options="Reason.Text for Reason in scopeData.ReasonList">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tCostCentre}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.CostCentre" ng-options="CostCentre.Text for CostCentre in scopeData.CostCentreList">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel"></td>
                                        <td class="FourColFormatter"></td>
                                    </tr>

                                    <tr>
                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tSubscription}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.SelectedSubscription" ng-options="Subscription.externalid for Subscription in scopeData.SubscriptionList" ng-disabled="scopeData.CaseOriginReadOnly">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tCaseID}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="text" ng-model="scopeData.CaseID" ng-disabled="scopeData.ReadOnlyCaseIdType">
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tBillDoc}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="text" ng-model="scopeData.BillDoc">
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tStartFault}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" id="StartFault" type="date" ng-model="scopeData.StartFault" ng-disabled="scopeData.ReadOnlyFault">
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tBillingAccount}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.SelectedBillingAccount" ng-options="BillingAccount.name for BillingAccount in scopeData.BillingAccountList">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tCaseType}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="text" ng-model="scopeData.CaseType" ng-disabled="scopeData.ReadOnlyCaseIdType">
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tApprovelLevel}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.selectedApprovelLevel" ng-options="approvelLevel.value for approvelLevel in scopeData.approvelLevels">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tEndFault}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" id="EndFault" type="date" ng-model="scopeData.EndFault" ng-disabled="scopeData.ReadOnlyFault">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="width: 100%;" ng-show="scopeData.OccTypeAdjustmentDiv">
                <tbody>
                    <tr>
                        <td>
                            <div class="dataGridTitleText dataGridTitleTextUnderlined"><span>{{scopeData.translations.tOCCAmount}}</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tOccType}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.SelectedOccType" ng-options="OccType.Text for OccType in scopeData.OccTypeList">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tAmount}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="text" ng-model="scopeData.Total">
                                        </td>

                                        <td class="FourColPercentColWidthLabel"></td>
                                        <td class="FourColFormatter"></td>

                                        <td class="FourColPercentColWidthLabel"></td>
                                        <td class="FourColFormatter"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="width: 100%;" ng-show="scopeData.CreditNoteDiv">
                <tbody>
                    <tr>
                        <td>
                            <div class="dataGridTitleText dataGridTitleTextUnderlined"><span>{{scopeData.translations.tSearchInvoice}}</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tCustomerID}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="text" ng-model="scopeData.CustomerID" ng-disabled="true">
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tStartDate}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="date" ng-model="scopeData.StartDate">
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tEndDate}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="date" ng-model="scopeData.EndDate">
                                        </td>

                                        <td class="FourColPercentColWidthLabel"></td>
                                        <td class="FourColFormatter"></td>
                                    </tr>

                                    <tr>
                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tLineNumber}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="text" ng-model="scopeData.LineNumber">
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tDocType}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <select class="FixedWidthInput" ng-model="scopeData.SelectedDocType" ng-options="DocType.Text for DocType in scopeData.DocTypeList" ng-disabled="true">
                                                <option value="">{{scopeData.translations.tSelect}}</option>
                                            </select>
                                        </td>

                                        <td class="FourColPercentColWidthLabel">
                                            <div title="Language" class="formFieldLabel">
                                                <span>{{scopeData.translations.tDocID}}</span>
                                            </div>
                                        </td>
                                        <td class="FourColFormatter">
                                            <input class="FixedWidthInput" type="text" ng-model="scopeData.DocID" ng-disabled="true">
                                        </td>

                                        <td class="FourColPercentColWidthLabel"></td>
                                        <td class="FourColFormatter">
                                            <button class="FixedWidthInput" ng-click="scopeData.GetInvoiceFromOAC()">{{scopeData.translations.tSearchInvoice}}</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="width: 100%;" ng-show="scopeData.CreditNoteDiv">
                <tbody>
                    <tr>
                        <td valign="top">
                            <div class="dataGridTitleText dataGridTitleTextUnderlined"><span>{{scopeData.translations.tInvoices}}</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td width="auto">
                                            <button class="FixedWidthInput" ng-click="scopeData.GetInvoiceDetailsFromBscs()">{{scopeData.translations.tViewDetail}}</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td width="auto">
                                            <div class="dataGridWrapper fontClass">
                                                <table class="dataGridHeader" style="font-size: 11px;">
                                                    <colgroup>
                                                        <col style="width: 110px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 50px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 80px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 80px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 80px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 80px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 80px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 80px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 80px;">
                                                        <col style="width: 2px;">
                                                        <col style="width: 80px;">
                                                        <col style="width: 2px;">
                                                    </colgroup>
                                                    <tbody>
                                                        <tr class="dataGridHeaderRow">
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tAccountName}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tDocStatus}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tDocIssueDate}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tDueDate}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tDocAmount}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tSolAmount}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tUSDAmount}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tReclaimedAmount}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tPaymenOpNo}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                            <th class="dataGridHeaderCell">{{scopeData.translations.tPaymentDate}}</th>
                                                            <td class="dataGridHeaderResizeCell">
                                                                <img class="barLine" alt="" src="./customerdata_files/transparent_spacer.gif">
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div style="height: 120px; overflow: auto;">
                                                    <table style="text-align: left; font-size: 11px;">
                                                        <colgroup>
                                                            <col style="width: 110px;">
                                                            <col style="width: 50px;">
                                                            <col style="width: 80px;">
                                                            <col style="width: 80px;">
                                                            <col style="width: 80px;">
                                                            <col style="width: 80px;">
                                                            <col style="width: 80px;">
                                                            <col style="width: 80px;">
                                                            <col style="width: 80px;">
                                                            <col style="width: 80px;">
                                                        </colgroup>
                                                        <tbody>
                                                            <tr class="dataGridBodyRow" ng-click="scopeData.selectedIndexChangeOACInvoice(Invoice)" ng-repeat="Invoice in scopeData.ListOfInvoices" ng-class="{ selectedRow : Invoice.IsSelected }">
                                                                <td>
                                                                    <div class="dataGridCellContent">
                                                                        <input type="radio" ng-checked="Invoice.IsSelected">
                                                                        <span>{{Invoice.AccountName}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.DocStatus}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.DocIssueDate}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.DueDate}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.DocAmount}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.SolAmount}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.UsdAmount}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.ReclaimedAmount}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.PaymentOpNo}}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="dataGridCellContent GridContentCentre">
                                                                        <span>{{Invoice.PaymentDate}}</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="width: 100%; height: 350px;" ng-show="scopeData.CreditNoteDiv">
                <tbody>
                    <tr>
                        <td>
                            <div class="dataGridTitleText dataGridTitleTextUnderlined"><span>{{scopeData.translations.tInvoiceDetail}}</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="overflow: auto;">
                                <tbody>
                                    <tr>
                                        <td style="float: left;">
                                            <div style="overflow: auto;">
                                                <table style="width: 50%; height: auto; overflow: auto;">
                                                    <tbody>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tCategory}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tOriginalAmt}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tAdjustmentAmt}}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tFixedCharge}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsFixedCharge" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.FixedCharge" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsFixedCharge,scopeData.FixedCharge,'FixedCharge')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsFixedCharge,'FixedCharge')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tInternational}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsInternational" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.International" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsInternational,scopeData.International,'International')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsInternational,'International')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tLocalAdditional}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsLocalAdditional" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.LocalAdditional" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsLocalAdditional,scopeData.LocalAdditional,'LocalAdditional')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsLocalAdditional,'LocalAdditional')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tLocalConsumption}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsLocalConsumption" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.LocalConsumption" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsLocalConsumption,scopeData.LocalConsumption,'LocalConsumption')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsLocalConsumption,'LocalConsumption')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tNational}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsNational" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.National" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsNational,scopeData.National,'National')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsNational,'National')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tOCCwithoutTax}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsOCCwithoutTax" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.OCCwithoutTax" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsOCCwithoutTax,scopeData.OCCwithoutTax,'OCCwithoutTax')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsOCCwithoutTax,'OCCwithoutTax')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tOCCwithTax}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsOCCwithTax" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.OCCwithTax" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsOCCwithTax,scopeData.OCCwithTax,'OCCwithTax')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsOCCwithTax,'OCCwithTax')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tRoaming}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsRoaming" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.Roaming" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsRoaming,scopeData.Roaming,'Roaming')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsRoaming,'Roaming')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tOthers}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsVAS" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.VAS" ng-change="scopeData.OnFocusChangeAdjustmentCell(scopeData.BscsVAS,scopeData.VAS,'VAS')" ng-disabled="scopeData.SetAdjustmentFieldDisable(scopeData.BscsVAS,'VAS')">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tTotal}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.BscsTotal" ng-disabled="true">
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.Total" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="width: 100%; height: 350px;" ng-show="scopeData.AdjustedCreditNote">
                <tbody>
                    <tr>
                        <td>
                            <div class="dataGridTitleText dataGridTitleTextUnderlined"><span>{{scopeData.translations.tAdjustedValues}}</span></div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="overflow: auto;">
                                <tbody>
                                    <tr>
                                        <td style="float: left;">
                                            <div style="overflow: auto;">
                                                <table style="width: 50%; height: auto; overflow: auto;">
                                                    <tbody>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tDocumentRefNo}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.BscsDocRefNumber}}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tCategory}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tAdjustmentAmt}}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tFixedCharge}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.FixedCharge" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tInternational}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.International" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tLocalAdditional}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.LocalAdditional" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tLocalConsumption}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.LocalConsumption" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tNational}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.National" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tOCCwithoutTax}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.OCCwithoutTax" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tOCCwithTax}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.OCCwithTax" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tRoaming}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.Roaming" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tOthers}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.VAS" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="ThreeColPercentWidthLabel">
                                                                <div title="Language" class="formFieldLabel">
                                                                    <span>{{scopeData.translations.tTotal}}</span>
                                                                </div>
                                                            </td>
                                                            <td class="ThreeColFormatter">
                                                                <input class="BscsFixedWidthInput" type="text" ng-model="scopeData.Total" ng-disabled="true">
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
<script>
    wizard.controller("adjustmentTypeController",
        ['$scope', '$http', '$rootScope', '$window', 'uiGridConstants',
            function ($scope, $http, $rootScope, $window, uiGridConstants, uiGridGroupingConstants) {
                debugger;
            //Form id for fetching Translations for Billing Profile Stage in Renew Order
                var formAdjustmentTypeStage = "JS_BiAdjustmentTypeController";

                var entityInformation = EntityInfo.GetEntityInfo();
                $scope.orderCaptureId = entityInformation.entityId;
                $scope.psbUrl = Wizard.Util.configStore.PsbRestServiceUrl;

                $scope.resumeInput.data = {};
                $scope.direct = $rootScope.direct;
                if ($scope.direct === "rtl") {
                    $scope.isRTL = true;
        }
        else {
                    $scope.isRTL = false;
        }

                $rootScope.displayColumnNewValue = false;
                $rootScope.displayColumnOption = false;
                if (typeof $scope.scopeData === "undefined") {
                    $scope.scopeData = {};
        }

                $scope.scopeData = {};
                $scope.scopeData.translations = {};
            //$scope.scopeData.BiCreateBiNumber = CrmUtil.GetBiNumberCreator();
                $scope.scopeData.BiAdjustmentModel = {};
                $scope.scopeData.CaseOriginReadOnly = false;
                $scope.scopeData.DisableSearchBscs = false;
                $scope.scopeData.AdjustmentTypeList = [];
                $scope.scopeData.SelectedAdjustmentType = {};
                $scope.scopeData.CostCentreList = [];
                $scope.scopeData.OriginList = [];
                $scope.scopeData.ReasonList = [];
                $scope.scopeData.SubscriptionList = [];
                $scope.scopeData.DocTypeList = [];
                $scope.scopeData.BillingAccountList = [];
                $scope.scopeData.ListOfInvoices = [];
                $scope.scopeData.SelectedInvoiceInOACGrid = {};
                $scope.scopeData.Customer = EntityInfo.GetCustomerInfo();
                $scope.scopeData.CustomerExternalId = "";
                $scope.scopeData.GetBillingAccount = function () {

                    var customerGuidStringify = CrmUtil.TrimId($scope.scopeData.Customer.customerId);
                    var req = new XMLHttpRequest();
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/etel_billingaccounts?$select=etel_allowcallitemizationoninvoice,etel_billmediumcode,_etel_billtoaddressid_value,_etel_mailtoaddressid_value,etel_name,etel_numberofcopies&$filter=_etel_customerindividualid_value eq " + customerGuidStringify + "&$count=true", false);
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;
                            if (this.status === 200) {
                                var results = JSON.parse(this.response);
                                var recordCount = results["@odata.count"];
                                $scope.scopeData.BillingAccountList = [];
                                if (recordCount > 0) {
                                    for (var i = 0; i < results.value.length; i++) {
                                        $scope.scopeData.BillingAccountList.push({
                                            "name": results.value[i]["etel_name"],
                                            "billingAddress": results.value[i]["_etel_billtoaddressid_value@OData.Community.Display.V1.FormattedValue"],
                                            "mailingAddress": results.value[i]["_etel_mailtoaddressid_value@OData.Community.Display.V1.FormattedValue"],
                                            "billMedium": results.value[i]["etel_billmediumcode@OData.Community.Display.V1.FormattedValue"],
                                            "numberOfCopies": results.value[i]["etel_numberofcopies@OData.Community.Display.V1.FormattedValue"],
                                            "callItemization": results.value[i]["etel_allowcallitemizationoninvoice@OData.Community.Display.V1.FormattedValue"],
                                            "allowcallitemizationoninvoice": results.value[i]["etel_allowcallitemizationoninvoice"],
                                            "billingaccountid": results.value[i]["etel_billingaccountid"],
                                            "billmediumcode": results.value[i]["etel_billmediumcode"],
                                            "externalid": results.value[i]["etel_externalid"],
                                            "numberofcopies": results.value[i]["etel_numberofcopies"],
                                            "primarybillingaccount": results.value[i]["etel_primarybillingaccount"],
                                            "statuscode": results.value[i]["statuscode"]
        });
        }
        }
        } else {
                                Xrm.Utility.alertDialog(this.statusText);
        }
        }
        };
                    req.send();
        };
                $scope.scopeData.GetSubscriptions = function () {

                    var customerGuidStringify = CrmUtil.TrimId($scope.scopeData.Customer.customerId);
                    var req = new XMLHttpRequest();
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/etel_subscriptions?$select=etel_externalid,etel_msisdnserialno,etel_subscriptionid,etel_name&$filter=_etel_individualcustomerid_value eq " + customerGuidStringify, false);
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;
                            if (this.status === 200) {
                                var results = JSON.parse(this.response);
                                if (results.value.length > 0) {
                                    $scope.scopeData.SubscriptionList = [];
                                    for (var i = 0; i < results.value.length; i++) {
                                        $scope.scopeData.SubscriptionList.push({
                                            "externalid": results.value[i]["etel_externalid"],
                                            "msisdn": results.value[i]["etel_msisdnserialno"],
                                            "name": results.value[i]["etel_name"],
                                            "guid": results.value[i]["etel_subscriptionid"]
        });
        }
        }

        } else {
                                Xrm.Utility.alertDialog(this.statusText);
        }
        }
        };
                    req.send();
        };
                $scope.scopeData.GetInvoiceDetailsFromBscs = function () {
                    debugger;

            //TODO:OAC Interface INT-CDNP-003-02 Issue : its not returning Proper Data -- Issue Reported to Claro
            //To fetch the Invoice Detail from BSCS, we're using a sample hard value of a Invoice Present in BSCS "IN0000000014REI" in DMZ environment
            //This must be removed before we move code to QA2
                    $scope.scopeData.SelectedInvoiceInOACGrid.PaymentOpNo = "IN0000000014REI";
            //This must be removed before we move code to QA2

                    if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.SelectedInvoiceInOACGrid.PaymentOpNo)) {
                        var request = {
                            "getInvoiceDetailRequest": {
                                "$type": "AmxPeruPSBActivities.Activities.BiAdjustment.GetInvoiceDetailRequestModel, AmxPeruPSBActivities",
                                "CustExtId": $scope.scopeData.CustomerExternalId,
                                "InvoiceId": $scope.scopeData.SelectedInvoiceInOACGrid.PaymentOpNo
        }
        };

                        PsbHelper.ExecuteFlow($http, 'AmxPeruGetInvoiceDetails', request, function (result) {
                            if (result != null) {
                                if (result) {
                                    debugger;
                                    var BscsResponse = result.Output.getInvoiceDetailResponse;
                                    if (BscsResponse.success == true) {
                                        if (BscsResponse.ListOfInvoiceChargeCategory.length > 0) {
                                            $scope.scopeData.BscsDocRefNumber = BscsResponse.InvoiceId;
                                            var TotalBscsValue = 0.00;
                                            for (var i = 0; i < BscsResponse.ListOfInvoiceChargeCategory.length; i++) {
                                                switch (BscsResponse.ListOfInvoiceChargeCategory[i].CategoryTypeCode) {
                                                    case 1:
                                                        $scope.scopeData.BscsFixedCharge = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;

                                                        $scope.scopeData.BscsFixedCharge = 20;

                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
                                                    case 2:
                                                        $scope.scopeData.BscsInternational = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
                                                    case 3:
                                                        $scope.scopeData.BscsLocalAdditional = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
                                                    case 4:
                                                        $scope.scopeData.BscsLocalConsumption = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
                                                    case 5:
                                                        $scope.scopeData.BscsNational = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;

                                                        $scope.scopeData.BscsNational = 15;

                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
                                                    case 6:
                                                        $scope.scopeData.BscsOCCwithoutTax = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
                                                    case 7:
                                                        $scope.scopeData.BscsOCCwithTax = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;

                                                        $scope.scopeData.BscsOCCwithTax = 15;

                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
                                                    case 8:
                                                        $scope.scopeData.BscsRoaming = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
                                                    case 9:
                                                        $scope.scopeData.BscsVAS = BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        TotalBscsValue += BscsResponse.ListOfInvoiceChargeCategory[i].Amount;
                                                        break;
        }
        }

            //$scope.scopeData.BscsCostCenter = BscsResponse.ListOfInvoiceChargeCategory[0].CostCenter;
            //$scope.scopeData.BscsSubReason = BscsResponse.ListOfInvoiceChargeCategory[0].SubReason;
            //$scope.scopeData.BscsResponsible = BscsResponse.ListOfInvoiceChargeCategory[0].Responsible;

            //Perform Total
                                            $scope.scopeData.BscsTotal = TotalBscsValue;
        }
        }
        else {
                                        alert($scope.scopeData.translations.tPSBReturnError);
        }
        }
        }
        });
        }
        else {
                        alert($scope.scopeData.translations.tSelectInvoice);
        }
        };
                $scope.scopeData.SetAdjustmentFieldDisable = function (BscsValue, categoryIdentifier) {
                    if (BscsValue == 0) {
                        $scope.scopeData.SetValueForModel(categoryIdentifier, "0");
                        return true;
        }
        else {
                        return false;
        }
        };
                $scope.scopeData.SetValueForModel = function (categoryIdentifier, value) {
                    debugger;
                    switch (categoryIdentifier) {
                        case "FixedCharge":
                            $scope.scopeData.FixedCharge = value;
                            break;
                        case "International":
                            $scope.scopeData.International = value;
                            break;
                        case "LocalAdditional":
                            $scope.scopeData.LocalAdditional = value;
                            break;
                        case "LocalConsumption":
                            $scope.scopeData.LocalConsumption = value;
                            break;
                        case "National":
                            $scope.scopeData.National = value;
                            break;
                        case "OCCwithoutTax":
                            $scope.scopeData.OCCwithoutTax = value;
                            break;
                        case "OCCwithTax":
                            $scope.scopeData.OCCwithTax = value;
                            break;
                        case "Roaming":
                            $scope.scopeData.Roaming = value;
                            break;
                        case "VAS":
                            $scope.scopeData.VAS = value;
                            break;
        }
        };
                $scope.scopeData.OnFocusChangeAdjustmentCell = function (BscsVal, InputVal, categoryIdentifier) {
                    debugger;

                    if (CrmUtil.IsNullOrUndefinedOrEmpty(InputVal)) {
                        InputVal = 0.00;
        }

                    if (CrmUtil.IsNullOrUndefinedOrEmpty(BscsVal)) {
                        BscsVal = 0.00
        }

                    if (parseFloat(InputVal) > parseFloat(BscsVal)) {
                        $scope.scopeData.SetValueForModel(categoryIdentifier, "");
                        alert($scope.scopeData.translations.tAdjValOutOfRange);
        }

                    var AdjustedValue = 0.00;
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.FixedCharge)) ? 0.00 : parseFloat($scope.scopeData.FixedCharge);
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.International)) ? 0.00 : parseFloat($scope.scopeData.International);
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.LocalAdditional)) ? 0.00 : parseFloat($scope.scopeData.LocalAdditional);
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.LocalConsumption)) ? 0.00 : parseFloat($scope.scopeData.LocalConsumption);
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.National)) ? 0.00 : parseFloat($scope.scopeData.National);
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.OCCwithoutTax)) ? 0.00 : parseFloat($scope.scopeData.OCCwithoutTax);
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.OCCwithTax)) ? 0.00 : parseFloat($scope.scopeData.OCCwithTax);
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.Roaming)) ? 0.00 : parseFloat($scope.scopeData.Roaming);
                    AdjustedValue += isNaN(parseFloat($scope.scopeData.VAS)) ? 0.00 : parseFloat($scope.scopeData.VAS);
                    $scope.scopeData.Total = AdjustedValue;
        };
                $scope.scopeData.GetInvoiceFromOAC = function () {
                    debugger;
                    var startDate = null;
                    var endDate = null;
                    if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.StartDate)) {
                        startDate = $scope.scopeData.StartDate;
        }
                    if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.EndDate)) {
                        endDate = $scope.scopeData.EndDate;
        }

                    if (($scope.scopeData.StartDate) > ($scope.scopeData.EndDate)) {
                        alert($scope.scopeData.translations.tEndDateIsGreaterThanStartDate);
                        return false;
        }

                    var lineNumber; //OAC has Data for this telephoneNumber only //980537875
                    if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.LineNumber)) {
                        lineNumber = $scope.scopeData.LineNumber;
        }

                    var customerExtId;
                    if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.CustomerExternalId)) {
                        customerExtId = $scope.scopeData.CustomerExternalId;

                        customerExtId = "79386270" //OAC has Data for this CustomerId only //TODO:Must be removed before we move to QA2
        }

                    var request = {
                        "$type": "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
                        "request": {
                            "$type": "AmxPeruPSBActivities.Activities.External.AmxPeruConsultaEstadoCuentaRequestDTO, AmxPeruPSBActivities",
                            "startDateTime": startDate,
                            "endDateTime": endDate,
                            "isClaimedBalance": true,
                            "isOutstandingbalance": true,
                            "queryFilter": "PAGO",
                            "productSpecTypeName": "MOVIL",
                            "partyAccountId": customerExtId,
                            "businessInteractionId": "12",
                            "trackingRecordSystemId": "ST",
                            "trackingRecordUserId": "ST",
                            "telephoneNumber": lineNumber,
                            "_attributeValuePair": {
                                "$type": "AmxPeruPSBActivities.Activities.External.attributeValuePair[], AmxPeruPSBActivities",
                                "$values": [
        {
                                        "$type": "AmxPeruPSBActivities.Activities.External.attributeValuePair, AmxPeruPSBActivities",
                                        "attrName": "tamanoPagina",
                                        "attrVal": "1"
        },
        {
                                        "$type": "AmxPeruPSBActivities.Activities.External.attributeValuePair, AmxPeruPSBActivities",
                                        "attrName": "nroPagina",
                                        "attrVal": "1"
        }
        ]
        }
        }
        };

                    PsbHelper.ExecuteFlow($http, 'AmxPeruConsultaEstadoCuenta', request, function (result) {
                        if (result != null) {
                            if (result) {
                                debugger;
                                var status = result.Output.response.Status;
                                if (status == 0) {
                                    $scope.scopeData.ListOfInvoices = [];
                                    if (result.Output.response.accountStatusTypeList.length > 0 &&
                                        result.Output.response.statusDetailsTypeList.length > 0 &&
                                        result.Output.response.accountStatusTypeList.length == result.Output.response.statusDetailsTypeList.length) {
                                        for (var i = 0; i < result.Output.response.statusDetailsTypeList.length; i++) {
                                            $scope.scopeData.ListOfInvoices.push({
                                                "IsSelected": false,
                                                "AccountName": result.Output.response.accountStatusTypeList[i].accountName,
                                                "DocStatus": result.Output.response.statusDetailsTypeList[i].documentStatus,
                                                "DocIssueDate": result.Output.response.statusDetailsTypeList[i].documentIssueDate,
                                                "DueDate": result.Output.response.statusDetailsTypeList[i].duedate,
                                                "DocAmount": result.Output.response.statusDetailsTypeList[i].docAmount,
                                                "SolAmount": result.Output.response.statusDetailsTypeList[i].solesAmount,
                                                "UsdAmount": result.Output.response.statusDetailsTypeList[i].dollarAmount,
                                                "ReclaimedAmount": result.Output.response.statusDetailsTypeList[i].reclaimedAmount,
                                                "PaymentOpNo": result.Output.response.statusDetailsTypeList[i].paymentOperationNumber,
                                                "PaymentDate": result.Output.response.statusDetailsTypeList[i].paymentDate.substr(0, 10)
        });
        }
        }
        else {
                                        alert($scope.scopeData.translations.tNoInvoiceFoundInOAC);
        }
        }
        else {
                                    alert($scope.scopeData.translations.tPSBReturnError);
        }
        }
        }
        });
        };
                $scope.scopeData.selectedIndexChangeOACInvoice = function (SelectedInvoice) {
                    debugger;
                    angular.forEach($scope.scopeData.ListOfInvoices, function (currentItem) {
                        if (currentItem !== SelectedInvoice) {
                            currentItem.IsSelected = false;
        }
        });
                    SelectedInvoice.IsSelected = !SelectedInvoice.IsSelected;
                    $scope.scopeData.SelectedInvoiceInOACGrid = SelectedInvoice;
                    if (SelectedInvoice.IsSelected == true) {
                        $scope.scopeData.DisableSearchBscs = true;
        }
        else {
                        $scope.scopeData.DisableSearchBscs = false;
        }
        };
                $scope.scopeData.getOptionsetValues = function (entityName, attribuetName) {
                    var levels = [];
                    var reqforPR = new XMLHttpRequest();
                    reqforPR.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/" + "EntityDefinitions(LogicalName='" + entityName + "')/Attributes(LogicalName='" + attribuetName + "')/Microsoft.Dynamics.CRM.PicklistAttributeMetadata?$select=LogicalName&$expand=OptionSet,GlobalOptionSet  ", false);
                    reqforPR.setRequestHeader("OData-MaxVersion", "4.0");
                    reqforPR.setRequestHeader("OData-Version", "4.0");
                    reqforPR.setRequestHeader("Accept", "application/json");
                    reqforPR.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                    reqforPR.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            reqforPR.onreadystatechange = null;
                            if (this.status === 200) {
                                var results = JSON.parse(this.response);
                                for (var i = 0; i < results.OptionSet.Options.length; i++) {
                                    levels.push({ key: results.OptionSet.Options[i].Value, value: results.OptionSet.Options[i].Label.LocalizedLabels[0].Label })
        }
        }
        }
        }
                    reqforPR.send();
                    $scope.scopeData.approvelLevels = levels;
                    $scope.scopeData.selectedApprovelLevel = $scope.scopeData.approvelLevels[0];
        };
                $scope.scopeData.GetDetailsFromCase = function () {


            //Bi Adjustment Record ID
                    var BiAdjustmentRecordId, BiAdjustmentRecordName, BiAdjustmentRecordTypeCode;
                    var BiAdjustmentRecord = Xrm.Page.getAttribute("amxperu_biadjustmentid");
                    if ((BiAdjustmentRecord != null) && (BiAdjustmentRecord.getValue() != null)) {
                        BiAdjustmentRecordId = BiAdjustmentRecord.getValue()[0].id;
                        BiAdjustmentRecordName = BiAdjustmentRecord.getValue()[0].name;
                        BiAdjustmentRecordTypeCode = BiAdjustmentRecord.getValue()[0].entityType;
        }

                    $scope.scopeData.BiAdjustmentRecordId = BiAdjustmentRecordId = CrmUtil.TrimId(BiAdjustmentRecordId);

            //Fetch Bi Adjustment Details and Associate with Order Capture
                    if (BiAdjustmentRecordId != null && BiAdjustmentRecordId != undefined) {
                        var req = new XMLHttpRequest();
                        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/etel_bi_adjustments(" + BiAdjustmentRecordId + ")?$select=amxperu_adjustmentamount,_amxperu_billingaccountid_value,_amxperu_billingdocumentid_value,amxperu_billingdocumentpaymentdate,amxperu_caseid,amxperu_casetype,_etel_subscriptionid_value", false);
                        req.setRequestHeader("OData-MaxVersion", "4.0");
                        req.setRequestHeader("OData-Version", "4.0");
                        req.setRequestHeader("Accept", "application/json");
                        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                        req.onreadystatechange = function () {
                            if (this.readyState === 4) {
                                req.onreadystatechange = null;
                                if (this.status === 200) {
                                    var result = JSON.parse(this.response);
                                    var amxperu_adjustmentamount = result["amxperu_adjustmentamount"];
                                    var amxperu_adjustmentamount_formatted = result["amxperu_adjustmentamount@OData.Community.Display.V1.FormattedValue"];
                                    var _amxperu_billingaccountid_value = result["_amxperu_billingaccountid_value"];
                                    var _amxperu_billingaccountid_value_formatted = result["_amxperu_billingaccountid_value@OData.Community.Display.V1.FormattedValue"];
                                    var _amxperu_billingaccountid_value_lookuplogicalname = result["_amxperu_billingaccountid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    var _amxperu_billingdocumentid_value = result["_amxperu_billingdocumentid_value"];
                                    var _amxperu_billingdocumentid_value_formatted = result["_amxperu_billingdocumentid_value@OData.Community.Display.V1.FormattedValue"];
                                    var _amxperu_billingdocumentid_value_lookuplogicalname = result["_amxperu_billingdocumentid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    var amxperu_billingdocumentpaymentdate = result["amxperu_billingdocumentpaymentdate"];
                                    var amxperu_casetype = result["amxperu_casetype"];
                                    var amxperu_caseid = result["amxperu_caseid"];
                                    var _etel_subscriptionid_value = result["_etel_subscriptionid_value"];
                                    var _etel_subscriptionid_value_formatted = result["_etel_subscriptionid_value@OData.Community.Display.V1.FormattedValue"];
                                    var _etel_subscriptionid_value_lookuplogicalname = result["_etel_subscriptionid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                                    if (amxperu_caseid != null && amxperu_caseid != undefined) {
            //set case id
                                        $scope.scopeData.CaseID = amxperu_caseid;

            //set case type
                                        $scope.scopeData.CaseType = amxperu_casetype;

            //set subscription
                                        if (_etel_subscriptionid_value != null &&
                                            _etel_subscriptionid_value_formatted != null &&
                                            _etel_subscriptionid_value_lookuplogicalname != null) {
                                            for (var i = 0; i < $scope.scopeData.SubscriptionList.length; i++) {
                                                if ($scope.scopeData.SubscriptionList[i].guid == _etel_subscriptionid_value) {
                                                    $scope.scopeData.SelectedSubscription = $scope.scopeData.SubscriptionList[i];
        }
        }
        }

            //Set Adjustment Amount
                                        $scope.scopeData.GrandAdjAmount = amxperu_adjustmentamount;
        }

        } else {
                                    Xrm.Utility.alertDialog(this.statusText);
        }
        }
        };
                        req.send();
        }

                    $scope.scopeData.ReadOnlyCaseIdType = true;
        };
                $scope.scopeData.GetCustomerExtId = function () {

                    var customerGuidStringify = CrmUtil.TrimId($scope.scopeData.Customer.customerId);

                    var req = new XMLHttpRequest();
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/contacts(" + customerGuidStringify + ")?$select=amxperu_documenttype,etel_externalid,etel_passportnumber", false);
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;
                            if (this.status === 200) {
                                var result = JSON.parse(this.response);
                                var amxperu_documenttype = result["amxperu_documenttype"];
                                var amxperu_documenttype_formatted = result["amxperu_documenttype@OData.Community.Display.V1.FormattedValue"];
                                var etel_externalid = result["etel_externalid"];
                                var etel_passportnumber = result["etel_passportnumber"];

                                $scope.scopeData.CustomerExternalId = etel_externalid;
                                $scope.scopeData.CustomerID = $scope.scopeData.CustomerExternalId;
                                $scope.scopeData.DocID = etel_passportnumber;
                                for (var i = 0; i < $scope.scopeData.DocTypeList.length; i++) {
                                    if ($scope.scopeData.DocTypeList[i].Value == amxperu_documenttype) {
                                        $scope.scopeData.SelectedDocType = $scope.scopeData.DocTypeList[i];
        }
        }
        } else {
                                Xrm.Utility.alertDialog(this.statusText);
        }
        }
        };
                    req.send();
        };
                $scope.scopeData.SaveStageValue = function () {
                    debugger;

                    var IsCreditDebitNote = false;
                    var IsPositiveNegativeOCC = false;
                    var IsPrepaid = false

            //This condition checking is provisioning purpose, as design n dev is in progress, and later will be merged with the following conditional flow identifier
                    if (($scope.scopeData.SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.NegativeOCC) ||
                        ($scope.scopeData.SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.PositiveOCC)) {
                        IsPositiveNegativeOCC = true;
        }
        else if (($scope.scopeData.SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.SpecialCreditNote) ||
                        ($scope.scopeData.SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.SpecialDebitNote)) {
                        IsCreditDebitNote = true;
        }

                    var entity = {};

            //If Originated from Case
                    if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.CaseType)) {
                        entity.amxperu_casetype = $scope.scopeData.CaseType.toString();
        }

                    if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.CaseID)) {
                        entity.amxperu_caseid = $scope.scopeData.CaseID.toString();
        }

                    if (IsPositiveNegativeOCC) {


            //TODO:Adjustmet Type, Origin, Reason, CostCentre, BillingAccount, Subscription, Approval Level -- These to be Moved Out of this if Condition.
            //These are common values and mandatory for all 3 diff types of Adjustment
            //Design to be Confimred by Fabian.
            //Only OCC Flow is Established So Far

                        entity.etel_adjustmenttype = $scope.scopeData.SelectedAdjustmentType.Value;
                        entity.amxperu_origin = $scope.scopeData.SelectedOrigin.Value;
                        entity.amxperu_reason = $scope.scopeData.SelectedReason.Value;
                        entity.amxperu_areacostcenter = $scope.scopeData.CostCentre.Value;
                        entity["etel_subscriptionid@odata.bind"] = "/etel_subscriptions(" + $scope.scopeData.SelectedSubscription.guid + ")";
                        entity.amxperu_approvallevel = $scope.scopeData.selectedApprovelLevel.key;
                        entity.amxperu_billingaccountname = $scope.scopeData.SelectedBillingAccount.name;
                        entity.amxperu_occtype = $scope.scopeData.SelectedOccType.Value;
                        entity.amxperu_total = $scope.scopeData.Total;
                        entity.amxperu_billdoc = $scope.scopeData.BillDoc;

            //for Massive Failure We have Start n End Fault Dates
                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.StartFault)) {
                            entity.amxperu_startfaultdate = new Date($scope.scopeData.StartFault).toISOString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.EndFault)) {
                            entity.amxperu_endfaultdate = new Date($scope.scopeData.EndFault).toISOString();
        }
        }
        else if (IsCreditDebitNote) {
            //TODO:PP8 development is In Progress

                        entity.etel_adjustmenttype = $scope.scopeData.SelectedAdjustmentType.Value;
                        entity.amxperu_origin = $scope.scopeData.SelectedOrigin.Value;
                        entity.amxperu_reason = $scope.scopeData.SelectedReason.Value;
                        entity.amxperu_areacostcenter = $scope.scopeData.CostCentre.Value;
                        entity["etel_subscriptionid@odata.bind"] = "/etel_subscriptions(" + $scope.scopeData.SelectedSubscription.guid + ")";
                        entity.amxperu_approvallevel = $scope.scopeData.selectedApprovelLevel.key;
                        entity.amxperu_billingaccountname = $scope.scopeData.SelectedBillingAccount.name;
                        entity.amxperu_total = $scope.scopeData.Total.toString();
                        entity.amxperu_billdoc = $scope.scopeData.BillDoc;

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.StartDate)) {
                            entity.amxperu_startdatesearch = new Date($scope.scopeData.StartDate).toISOString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.EndDate)) {
                            entity.amxperu_enddatesearch = new Date($scope.scopeData.EndDate).toISOString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.SalesDoc)) {
                            entity.amxperu_salesdoc = $scope.scopeData.SalesDoc.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.LineNumber)) {
                            entity.amxperu_linenumber = $scope.scopeData.LineNumber.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.BillDoc)) {
                            entity.amxperu_billdoc = $scope.scopeData.BillDoc.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.BscsTotal)) {
                            entity.amxperu_total = $scope.scopeData.Total.toString();
                            entity.amxperu_docrefnumber = $scope.scopeData.BscsDocRefNumber;
                            entity.amxperu_isinvoiceadjusted = true;
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.FixedCharge)) {
                            entity.amxperu_fixedcharge = $scope.scopeData.FixedCharge.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.International)) {
                            entity.amxperu_international = $scope.scopeData.International.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.LocalAdditional)) {
                            entity.amxperu_localadditional = $scope.scopeData.LocalAdditional.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.LocalConsumption)) {
                            entity.amxperu_localconsumption = $scope.scopeData.LocalConsumption.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.National)) {
                            entity.amxperu_national = $scope.scopeData.National.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.OCCwithoutTax)) {
                            entity.amxperu_occwithouttax = $scope.scopeData.OCCwithoutTax.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.OCCwithTax)) {
                            entity.amxperu_occwithtax = $scope.scopeData.OCCwithTax.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.Roaming)) {
                            entity.amxperu_roaming = $scope.scopeData.Roaming.toString();
        }

                        if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.VAS)) {
                            entity.amxperu_vas = $scope.scopeData.VAS.toString();
        }

            //if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.BscsResponsible)) {
            //    entity.amxperu_responsible = $scope.scopeData.BscsResponsible.toString();
            //}                   

            //if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.BscsSubReason)) {
            //    entity.amxperu_bscssubreason = $scope.scopeData.BscsSubReason.toString();
            //}                    


            //if (!CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.BscsCostCenter)) {
            //    entity.amxperu_bscscostcenter = $scope.scopeData.BscsCostCenter.toString();
            //}
        }
        else if (IsPrepaid) {
            //TODO:Future Sprint
        }

                    var req = new XMLHttpRequest();
                    req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/etel_bi_adjustments(" + $scope.scopeData.BiAdjustmentRecordId + ")", false);
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.setRequestHeader("If-Match", "*");
                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;
                            if (this.status === 204) {
                                return true;
        } else {
                                Xrm.Utility.alertDialog(this.statusText);
        }
        }
        };
                    req.send(JSON.stringify(entity));
        };
                $scope.scopeData.SetStageValue = function () {
                    debugger;

                    var BiAdjustmentRecordId, BiAdjustmentRecordName, BiAdjustmentRecordTypeCode;
                    var BiAdjustmentRecord = Xrm.Page.getAttribute("amxperu_biadjustmentid");
                    if ((BiAdjustmentRecord != null) && (BiAdjustmentRecord.getValue() != null)) {
                        BiAdjustmentRecordId = BiAdjustmentRecord.getValue()[0].id;
                        BiAdjustmentRecordName = BiAdjustmentRecord.getValue()[0].name;
                        BiAdjustmentRecordTypeCode = BiAdjustmentRecord.getValue()[0].entityType;
        }

                    BiAdjustmentRecordId = CrmUtil.TrimId(BiAdjustmentRecordId);

                    var req = new XMLHttpRequest();
                    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/etel_bi_adjustments(" + BiAdjustmentRecordId + ")?$select=*", false);
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;
                            if (this.status === 200) {
                                var result = JSON.parse(this.response);

            //Get Adjustment Type
                                var AdjustmentTypeCode, OriginCode, ReasonCode, CostCenterCode, ApprovalLevelCode, OccTypeCode;
                                var Subscription, BillingAccount, CaseId, CaseType, BillDoc, StartFault, EndFault, Amount;
                                if (!CrmUtil.IsNullOrUndefinedOrEmpty(result["etel_adjustmenttype"])) {
                                    AdjustmentTypeCode = result["etel_adjustmenttype"];
        }

            //Set Common Values
            //Set OptionSetValues
                                $scope.scopeData.SelectedAdjustmentType = $scope.scopeData.SetOptionSetValue($scope.scopeData.AdjustmentTypeList, AdjustmentTypeCode);
                                $scope.scopeData.SelectedOrigin = $scope.scopeData.SetOptionSetValue($scope.scopeData.OriginList, result["amxperu_origin"]);

                                if (result["amxperu_origin"] == CrmOptionSet.AdjustmentOrigin.MassiveFailure) {
                                    $scope.scopeData.ReadOnlyFault = false;
        }

                                if (!CrmUtil.IsNullOrUndefinedOrEmpty(result["amxperu_startfaultdate"]) && !CrmUtil.IsNullOrUndefinedOrEmpty(result["amxperu_endfaultdate"])) {
                                    $scope.scopeData.StartFault = result["amxperu_startfaultdate"].substr(0, 10);
                                    $scope.scopeData.EndFault = result["amxperu_endfaultdate"].substr(0, 10);
        }

                                $scope.scopeData.SelectedReason = $scope.scopeData.SetOptionSetValue($scope.scopeData.ReasonList, result["amxperu_reason"]);
                                $scope.scopeData.CostCentre = $scope.scopeData.SetOptionSetValue($scope.scopeData.CostCentreList, result["amxperu_areacostcenter"]);

                                for (i = 0; i < $scope.scopeData.approvelLevels.length; i++) {
                                    if ($scope.scopeData.approvelLevels[i].key == result["amxperu_approvallevel"]) {
                                        $scope.scopeData.selectedApprovelLevel = $scope.scopeData.approvelLevels[i];
                                        break;
        }
        }

                                for (i = 0; i < $scope.scopeData.BillingAccountList.length; i++) {
                                    if ($scope.scopeData.BillingAccountList[i].name == result["amxperu_billingaccountname"]) {
                                        $scope.scopeData.SelectedBillingAccount = $scope.scopeData.BillingAccountList[i];
                                        break;
        }
        }

                                for (i = 0; i < $scope.scopeData.SubscriptionList.length; i++) {
                                    if ($scope.scopeData.SubscriptionList[i].guid == result["_etel_subscriptionid_value"]) {
                                        $scope.scopeData.SelectedSubscription = $scope.scopeData.SubscriptionList[i];
                                        break;
        }
        }

                                if (!CrmUtil.IsNullOrUndefinedOrEmpty(result["amxperu_total"])) {
                                    $scope.scopeData.Total = result["amxperu_total"];
        }

                                if (!CrmUtil.IsNullOrUndefinedOrEmpty(result["amxperu_billdoc"])) {
                                    $scope.scopeData.BillDoc = result["amxperu_billdoc"];
        }

                                if (!CrmUtil.IsNullOrUndefinedOrEmpty(result["amxperu_caseid"])) {
                                    $scope.scopeData.CaseID = result["amxperu_caseid"];
        }

                                if (!CrmUtil.IsNullOrUndefinedOrEmpty(result["amxperu_casetype"])) {
                                    $scope.scopeData.CaseType = result["amxperu_casetype"];
        }

                                $scope.scopeData.SelectedOccType = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_occtype"]);

                                $scope.scopeData.FixedCharge = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_fixedcharge"]);
                                $scope.scopeData.International = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_international"]);
                                $scope.scopeData.LocalAdditional = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_localadditional"]);
                                $scope.scopeData.LocalConsumption = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_localconsumption"]);
                                $scope.scopeData.National = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_national"]);
                                $scope.scopeData.OCCwithoutTax = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_occwithouttax"]);
                                $scope.scopeData.OCCwithTax = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_occwithtax"]);
                                $scope.scopeData.Roaming = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_roaming"]);
                                $scope.scopeData.VAS = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_vas"]);
                                $scope.scopeData.BscsDocRefNumber = $scope.scopeData.SetOptionSetValue($scope.scopeData.OccTypeList, result["amxperu_docrefnumber"]);

                                if ((AdjustmentTypeCode == CrmOptionSet.AdjustmentType.NegativeOCC) ||
                                    (AdjustmentTypeCode == CrmOptionSet.AdjustmentType.PositiveOCC)) {
            //Make Divs Visible
                                    $scope.scopeData.AdjustmentDetailDiv = true;
                                    $scope.scopeData.OccTypeAdjustmentDiv = true;
                                    $scope.scopeData.CreditNoteDiv = false;
                                    $scope.scopeData.AdjustedCreditNote = false;
        }
        else if ((AdjustmentTypeCode == CrmOptionSet.AdjustmentType.SpecialCreditNote) ||
                                    (AdjustmentTypeCode == CrmOptionSet.AdjustmentType.SpecialDebitNote)) {
                                    debugger;
            //Make Divs Visible
                                    $scope.scopeData.AdjustmentDetailDiv = true;
                                    $scope.scopeData.OccTypeAdjustmentDiv = false;
                                    $scope.scopeData.CreditNoteDiv = false;
                                    $scope.scopeData.AdjustedCreditNote = true;
        }
        } else {
                                Xrm.Utility.alertDialog(this.statusText);
        }
        }
        };
                    req.send();
        };
                $scope.scopeData.SetOptionSetValue = function (OptionSetList, ValueCode) {

                    var SelectedOptionSet;

                    if (!CrmUtil.IsNullOrUndefinedOrEmpty(ValueCode)) {
                        for (i = 0; i < OptionSetList.length; i++) {
                            if (OptionSetList[i].Value == ValueCode) {
                                SelectedOptionSet = OptionSetList[i];
        }
        }
        }

                    return SelectedOptionSet;
        };
                $scope.scopeData.OnAdjustmentSelectionChange = function (SelectedAdjustmentType) {
                    debugger;
                    if ((SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.PositiveOCC) || (SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.NegativeOCC)) {
                        $scope.scopeData.AdjustmentDetailDiv = true;
                        $scope.scopeData.OccTypeAdjustmentDiv = true;
                        $scope.scopeData.CreditNoteDiv = false;
        }
        else if ((SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.SpecialCreditNote) || (SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.SpecialDebitNote)) {
                        $scope.scopeData.AdjustmentDetailDiv = true;
                        $scope.scopeData.OccTypeAdjustmentDiv = false;
                        $scope.scopeData.CreditNoteDiv = true;
        }
        else {
                        $scope.scopeData.AdjustmentDetailDiv = false;
                        $scope.scopeData.OccTypeAdjustmentDiv = false;
                        $scope.scopeData.CreditNoteDiv = false;
        }
        };
                $scope.scopeData.OnOriginSelectionChange = function (SelectedOriginType) {

                    if (SelectedOriginType.Value == CrmOptionSet.AdjustmentOrigin.MassiveFailure) {
                        $scope.scopeData.ReadOnlyFault = false;
        }
        else {
                        document.getElementById("EndFault").valueAsDate = null;
                        document.getElementById("StartFault").valueAsDate = null;
                        $scope.scopeData.ReadOnlyFault = true;
        }
        };

            //Validate before moving to Next Stage
                $scope.$parent.$parent.nextValidator = function () {
                    debugger;
                    var ValidationErrorMessage = "";
                    if ($scope.workflowContext.ResponseData.CurrentBookmark == "tAdjustmentType") {

                        if (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.SelectedSubscription)) {
                            ValidationErrorMessage += $scope.scopeData.translations.tSelectSubscription;
        }

                        if (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.SelectedAdjustmentType)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSelectAdjustmentType;
        }

                        if (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.SelectedBillingAccount)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSelectBillingAccount;
        }

                        if (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.SelectedOrigin)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSelectOrigin;
        }
        else {
                            if (($scope.scopeData.SelectedOrigin.Value == CrmOptionSet.AdjustmentOrigin.MassiveFailure) &&
                                (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.StartFault) || CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.EndFault))) {
                                ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSelectStartEndFaultDate;
        }
        }

                        if (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.SelectedReason)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSelectReason;
        }

                        if (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.CostCentre)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSelectCostCenter;
        }

                        if (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.selectedApprovelLevel)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSelectApprovalLevel;
        }

                        if ((($scope.scopeData.SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.NegativeOCC) ||
                            ($scope.scopeData.SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.PositiveOCC)) &&
                            CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.SelectedOccType)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSelectOccType;
        }

                        if (CrmUtil.IsNullOrUndefinedOrEmpty($scope.scopeData.Total)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tSetAdjAmount;
        }

                        if (($scope.scopeData.SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.NegativeOCC) && (parseInt($scope.scopeData.Total) > 0)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tMustBeNegativeOCCValue;
        }
        else if (($scope.scopeData.SelectedAdjustmentType.Value == CrmOptionSet.AdjustmentType.PositiveOCC) && (parseInt($scope.scopeData.Total) < 0)) {
                            ValidationErrorMessage += "\n" + $scope.scopeData.translations.tMustBePositiveOCCValue;
        }

                        if (ValidationErrorMessage == "") {
                            $scope.scopeData.SaveStageValue();
                            return true;
        }
        else {
                            alert(ValidationErrorMessage);
        }
        }
        else {
                        return true;
        }
        };

                var initiate = function () {
                    debugger;

                    $scope.scopeData.translations = CrmTranslationHelper.GetTranslation(formAdjustmentTypeStage);
                    $scope.scopeData.OriginList = $scope.workflowContext.ResponseData.Output.OriginList;
                    $scope.scopeData.ReasonList = $scope.workflowContext.ResponseData.Output.ReasonList;
                    $scope.scopeData.AdjustmentTypeList = $scope.workflowContext.ResponseData.Output.AdjustmentList;
                    $scope.scopeData.CostCentreList = $scope.workflowContext.ResponseData.Output.CostCenterList;
                    $scope.scopeData.OccTypeList = $scope.workflowContext.ResponseData.Output.OccTypeList;
                    $scope.scopeData.DocTypeList = $scope.workflowContext.ResponseData.Output.DocTypeList;
                    $scope.scopeData.getOptionsetValues("etel_bi_adjustment", "amxperu_approvallevel");
                    $scope.scopeData.GetSubscriptions();
                    $scope.scopeData.GetCustomerExtId();
                    $scope.scopeData.GetBillingAccount();
                    $scope.scopeData.GetDetailsFromCase();

            //Show-Hide Params
                    $scope.scopeData.CreditNoteDiv = false;
                    $scope.scopeData.CreditAmount = false;
                    $scope.scopeData.ReadOnlyFault = true;
                    $scope.scopeData.AdjustmentDetailDiv = false;
                    $scope.scopeData.OccTypeAdjustmentDiv = false;
                    $scope.scopeData.AdjustedCreditNote = false;

                    $scope.scopeData.SetStageValue();
        };

                initiate();
        }]);
</script>

</body></html>