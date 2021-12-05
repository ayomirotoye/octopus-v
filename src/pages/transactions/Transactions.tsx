import React, { useEffect, useMemo, useState } from "react";
import {
  callTofetchEkedpTransaction,
} from "../../services/transactions-service";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { spinnerAreas } from "../../common/constants";
import { downloadCSV, isNullOrUndefined, isSuccessful } from "../../common/helpers";
import DataTable, { TableColumn } from "react-data-table-component";
import WordWrap from "../../components/WordWrap";
import VBadge from "../../components/VBadge";
import FilterComponent from "../../components/FilterComponent";
import { Button } from "reactstrap";
import { isWithinInterval } from "date-fns"
import Loader from "react-loader-spinner";

type DataRow = {
  id: string;
  createdAt: string;
  transactionId: string;
  terminalId: string;
  transactionReference: string;
  accountNumber: string;
  meterNumber: string;
  amount: string;
  commissionAmount: string;
  netAmount: string;
  paymentReference: string;
  customerDistrict: string;
  customerAddress: string;
  customerType: string;
  customerName: string;
  modeOfPayment: string;
  tariffClass: string;
  kilowatts: string;
  vat: string;
  transactionReceiptNumber: string;
  accountType: string;
  orderId: string;
  partnerChannel: string;
  paymentPurpose: string;
  responseCode: string;
  responseMessage: string;
  stdToken: string;
  bsstToken: string;
  updatedAt: string;
  status: string;
};

let requiredColumnHeaders = [
  "createdAt",
  "transactionId",
  "terminalId",
  "transactionReference",
  "accountNumber",
  "meterNumber",
  "amount",
  "commissionAmount",
  "netAmount",
  "paymentReference",
  "customerDistrict",
  "customerAddress",
  "customerType",
  "customerName",
  "modeOfPayment",
  "tariffClass",
  "kilowatts",
  "vat",
  "stdToken",
  "transactionReceiptNumber",
  "status",
];

let currentRecords: any = [];

const doFiltering = (searchArr: DataRow[], filterBy: string, filterVal: string) => {
  let resultArr = [];
  if (filterBy !== "SEARCH_BY_DATERANGE") {
    resultArr = searchArr !== undefined ?
      searchArr.filter(
        (item: any) =>
          Object.keys(item).filter(x => x === filterBy)
          && !isNullOrUndefined(item[filterBy])
          && String(item[filterBy].toLowerCase()).indexOf(filterVal.toLowerCase()) !== -1
      ) : [];
  } else {
    let arrDates = filterVal.split("|");
    let fromDate = new Date(arrDates[0]);
    let toDate = new Date(arrDates[1]);
    resultArr = searchArr !== undefined ?
      searchArr.filter(
        (item: any) =>
          Object.keys(item).filter(x => x === "createdAt")
          && !isNullOrUndefined(item["createdAt"])
          && isWithinDateRange(fromDate, toDate, new Date(item["createdAt"]))
      ) : [];
  }
  currentRecords = resultArr;
  return resultArr;
}

const isWithinDateRange = (startDate: Date, endDate: Date, dateToCheck: Date) => {
  let isWithin = isWithinInterval(
    dateToCheck,
    { start: startDate, end: endDate }
  )

  return isWithin;
}

const Export = ({ onExport }: any) => (
  <Button onClick={(e: any) => onExport(e.target.value)}>Export as CSV</Button>
);

const Transactions = () => {
  const { promiseInProgress } = usePromiseTracker({ delay: 0 });
  const [theTnxs, setTheTnxs] = useState(Object.assign([]));
  const [filterText, setFilterText] = React.useState("");

  const [dateRange, setDateRange] = React.useState({
    fromDate: "",
    toDate: ""
  });
  const [filterBy, setFilterBy] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  useEffect(() => {
    trackPromise(
      callTofetchEkedpTransaction()
        .then((res: any) => {
          if (isSuccessful(res.responseCode)) {
            currentRecords = res.data;
            setTheTnxs(res.data);
          } else {
            setTheTnxs([]);
          }
        })
        .catch((err) => {
          console.log("ERROR OCCURRED:::", err);
        }),
      spinnerAreas.transactions
    );
  }, []);

  const headers: TableColumn<DataRow>[] = React.useMemo(
    () => [
      {
        name: "S/N",
        sortable: true,
        cell: (_row: any, index: number) => index + 1,
        maxWidth: "5%",
      },
      {
        name: "DATE",
        selector: (row: { createdAt: any; }) => row.createdAt,
        cell: (row: { createdAt: any; }) => <WordWrap word={row.createdAt} />,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "ACCOUNT NUMBER",
        cell: (row: { accountNumber: any; }) => <WordWrap word={row.accountNumber} />,
        selector: (row: { accountNumber: any; }) => row.accountNumber,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "AMOUNT",
        cell: (row: { amount: any; }) => <WordWrap word={row.amount} />,
        selector: (row: { amount: any; }) => row.amount,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "STATUS",
        cell: (row: { status: any; }) => (
          // <VBadge responseCode={row.responseCode} statusCode={row.status} />
          <VBadge statusCode={row.status}><WordWrap word={row.status} /></VBadge>
        ),
        selector: (row: { responseCode: any; }) => row.responseCode,
        sortable: true,
        maxWidth: "5%",
      },
      {
        name: "TRANSACTION REFERENCE",
        selector: (row: { paymentReference: any; }) => row.paymentReference,
        cell: (row: { paymentReference: any; }) => <WordWrap word={row.paymentReference} />,
        sortable: true,
        maxWidth: "20%",
      },
      {
        name: "TRANSACTION ID",
        selector: (row: { transactionId: any; }) => row.transactionId,
        sortable: true,
        maxWidth: "15%",
      },
      {
        name: "TERMINAL ID",
        selector: (row: { terminalId: any; }) => row.terminalId,
        sortable: true,
        maxWidth: "15%",
      },
      {
        name: "METER NUMBER",
        cell: (row: { meterNumber: any; }) => <WordWrap word={row.meterNumber} />,
        selector: (row: { meterNumber: any; }) => row.meterNumber,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "CUSTOMER NAME",
        cell: (row: { customerName: any; }) => <WordWrap word={row.customerName} />,
        selector: (row: { customerName: any; }) => row.customerName,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "CUSTOMER ADDRESS",
        cell: (row: { customerAddress: any; }) => <WordWrap word={row.customerAddress} />,
        selector: (row: { customerAddress: any; }) => row.customerAddress,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "CUSTOMER TYPE",
        cell: (row: { customerType: any; }) => <WordWrap word={row.customerType} />,
        selector: (row: { customerType: any; }) => row.customerType,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "COMM. AMOUNT",
        cell: (row: { commissionAmount: any; }) => <WordWrap word={row.commissionAmount} />,
        selector: (row: { commissionAmount: any; }) => row.commissionAmount,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "NET AMOUNT",
        cell: (row: { netAmount: any; }) => <WordWrap word={row.netAmount} />,
        selector: (row: { netAmount: any; }) => row.netAmount,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "CUSTOMER DISTRICT",
        cell: (row: { customerDistrict: any; }) => <WordWrap word={row.customerDistrict} />,
        selector: (row: { customerDistrict: any; }) => row.customerDistrict,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "MODE OF PAYMENT",
        cell: (row: { modeOfPayment: any; }) => <WordWrap word={row.modeOfPayment} />,
        selector: (row: { modeOfPayment: any; }) => row.modeOfPayment,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "TARIFF CLASS",
        cell: (row: { tariffClass: any; }) => <WordWrap word={row.tariffClass} />,
        selector: (row: { tariffClass: any; }) => row.tariffClass,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "KILOWATTS",
        cell: (row: { kilowatts: any; }) => <WordWrap word={row.kilowatts} />,
        selector: (row: { kilowatts: any; }) => row.kilowatts,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "VAT",
        cell: (row: { vat: any; }) => <WordWrap word={row.vat} />,
        selector: (row: { vat: any; }) => row.vat,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "EMS RECEIPT/TOKEN",
        cell: (row: { stdToken: any; }) => <WordWrap word={row.stdToken} />,
        selector: (row: { stdToken: any; }) => row.stdToken,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "TRANSACTION RECEIPT NUMBER",
        cell: (row: { transactionReceiptNumber: any; }) => <WordWrap word={row.transactionReceiptNumber} />,
        selector: (row: { transactionReceiptNumber: any; }) => row.transactionReceiptNumber,
        sortable: true,
        maxWidth: "10%",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const actionsMemo = React.useMemo(
    () => (
      <Export
        onExport={() => downloadCSV(currentRecords, requiredColumnHeaders)}
      />
    ),
    []
  );

  let filteredItems: DataRow[] = [];

  const filteredItemz = () => {
    if (filterBy !== "SEARCH_BY_DATERANGE" && (filterText === "" || isNullOrUndefined(filterText))) {
      return theTnxs;
    } else if (filterBy === "SEARCH_BY_DATERANGE" && (dateRange.fromDate.length === 0 || dateRange.toDate.length === 0)) {
      return theTnxs;
    }
    switch (filterBy) {
      case "SEARCH_BY_DATE":
        filteredItems = doFiltering(theTnxs, "createdAt", filterText);
        break;
      case "SEARCH_BY_REFERENCE":
        filteredItems = doFiltering(theTnxs, "paymentReference", filterText);
        break;
      case "SEARCH_BY_METERNO":
        filteredItems = doFiltering(theTnxs, "meterNumber", filterText);
        break;
      case "SEARCH_BY_RECEIPTNO":
        filteredItems = doFiltering(theTnxs, "transactionReceiptNumber", filterText);
        break;
      case "SEARCH_BY_DATERANGE":
        filteredItems = doFiltering(theTnxs, "SEARCH_BY_DATERANGE", dateRange.fromDate.concat("|", dateRange.toDate));
        break;
      default:
        filteredItems = theTnxs !== undefined &&
          theTnxs.filter(
            (item: any) =>
              JSON.stringify(Object.values(item)).toLowerCase().indexOf(filterText.toLowerCase()) !==
              -1
          );
        break;
    }
    return filteredItems;
  }

  const handleClick = (eventKey: any, _event: any) => {
    switch (eventKey) {
      case "SEARCH_BY_DATE":
        setFilterBy("SEARCH_BY_DATE");
        break;
      case "SEARCH_BY_REFERENCE":
        setFilterBy("SEARCH_BY_REFERENCE");
        break;
      case "SEARCH_BY_METERNO":
        setFilterBy("SEARCH_BY_METERNO");
        break;
      case "SEARCH_BY_RECEIPTNO":
        setFilterBy("SEARCH_BY_RECEIPTNO");
        break;
      case "SEARCH_BY_DATERANGE":
        setFilterBy("SEARCH_BY_DATERANGE");
        break;
      default:
        setFilterBy("");
        break;
    }
  }


  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterBy !== "SEARCH_BY_DATERANGE") {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText("");
        }
      } else if (dateRange.fromDate.length > 0 || dateRange.toDate.length > 0) {
        setResetPaginationToggle(!resetPaginationToggle);
        setDateRange({ ...dateRange, fromDate: "", toDate: "" });
      }
    };


    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onFilterByDateRange={(e: any) => setDateRange({ ...dateRange, [e.target.id]: e.target.value })}
        onClear={handleClear}
        filterText={filterText}
        fromDate={dateRange.fromDate}
        toDate={dateRange.toDate}
        onClick={handleClick}
      />
    );
  }, [filterText, resetPaginationToggle, dateRange]);

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Transactions </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href="!#"
                onClick={(event) => event.preventDefault()}
                className="text-white"
              >
                Transactions
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              View
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">EKEDP Transactions</h4>
                  <p className="card-description">
                    A record of transactions done on EKEDP channel
                  </p>
                </div>
              </div>
              <>
                <DataTable
                  columns={headers}
                  pagination={true}
                  data={filteredItemz()}
                  subHeader
                  persistTableHead
                  subHeaderComponent={subHeaderComponent}
                  actions={actionsMemo}
                  progressPending={promiseInProgress}
                  progressComponent={<Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />}
                />
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
