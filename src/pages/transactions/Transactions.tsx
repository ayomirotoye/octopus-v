import React, { useEffect, useMemo, useState } from "react";
import {
  callToExportAsPDF,
  callTofetchEkedpTransaction,
} from "../../services/transactions-service";
import { trackPromise } from "react-promise-tracker";
import { spinnerAreas } from "../../common/constants";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { downloadCSV, isObject, isSuccessful } from "../../common/helpers";
import DataTable, { TableColumn } from "react-data-table-component";
import WordWrap from "../../components/WordWrap";
import VBadge from "../../components/VBadge";
import FilterComponent from "../../components/FilterComponent";
import { responseMessage } from "../../common/response-message";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import LoadingSpinner from "../../components/LoadingSpinner";

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
  "status"]

let currentRecords: any = [];

const Export = ({ onExport }: any) => (
  <Button onClick={(e: any) => onExport(e.target.value)}>Export as CSV</Button>
);

const Transactions = () => {
  const [theTnxs, setTheTnxs] = useState(Object.assign([]));
  const [filterText, setFilterText] = React.useState("");
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
        selector: (row) => row.createdAt,
        cell: (row) => <WordWrap word={row.createdAt} />,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "ACCOUNT NUMBER",
        cell: (row) => <WordWrap word={row.accountNumber} />,
        selector: (row) => row.accountNumber,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "AMOUNT",
        cell: (row) => <WordWrap word={row.amount} />,
        selector: (row) => row.amount,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "STATUS",
        cell: (row) => (
          <VBadge responseCode={row.responseCode} statusCode={row.status} />
        ),
        selector: (row) => row.responseCode,
        sortable: true,
        maxWidth: "5%",
      },
      {
        name: "TRANSACTION REFERENCE",
        selector: (row) => row.paymentReference,
        cell: (row) => <WordWrap word={row.paymentReference} />,
        sortable: true,
        maxWidth: "20%",
      },
      {
        name: "TRANSACTION ID",
        selector: (row) => row.transactionId,
        sortable: true,
        maxWidth: "15%",
      },
      {
        name: "TERMINAL ID",
        selector: (row) => row.terminalId,
        sortable: true,
        maxWidth: "15%",
      },
      {
        name: "METER NUMBER",
        cell: (row) => <WordWrap word={row.meterNumber} />,
        selector: (row) => row.meterNumber,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "CUSTOMER NAME",
        cell: (row) => <WordWrap word={row.customerName} />,
        selector: (row) => row.customerName,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "CUSTOMER ADDRESS",
        cell: (row) => <WordWrap word={row.customerAddress} />,
        selector: (row) => row.customerAddress,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "CUSTOMER TYPE",
        cell: (row) => <WordWrap word={row.customerType} />,
        selector: (row) => row.customerType,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "COMM. AMOUNT",
        cell: (row) => <WordWrap word={row.commissionAmount} />,
        selector: (row) => row.commissionAmount,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "NET AMOUNT",
        cell: (row) => <WordWrap word={row.netAmount} />,
        selector: (row) => row.netAmount,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "CUSTOMER DISTRICT",
        cell: (row) => <WordWrap word={row.customerDistrict} />,
        selector: (row) => row.customerDistrict,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "MODE OF PAYMENT",
        cell: (row) => <WordWrap word={row.modeOfPayment} />,
        selector: (row) => row.modeOfPayment,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "TARIFF CLASS",
        cell: (row) => <WordWrap word={row.tariffClass} />,
        selector: (row) => row.tariffClass,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "KILOWATTS",
        cell: (row) => <WordWrap word={row.kilowatts} />,
        selector: (row) => row.kilowatts,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "VAT",
        cell: (row) => <WordWrap word={row.vat} />,
        selector: (row) => row.vat,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "EMS RECEIPT/TOKEN",
        cell: (row) => <WordWrap word={row.stdToken} />,
        selector: (row) => row.stdToken,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "TRANSACTION RECEIPT NUMBER",
        cell: (row) => <WordWrap word={row.transactionReceiptNumber} />,
        selector: (row) => row.transactionReceiptNumber,
        sortable: true,
        maxWidth: "10%",
      },
     
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(currentRecords, requiredColumnHeaders)} />,
    []
  );

  const exportAsPDF = () => {
    trackPromise(
      callToExportAsPDF()
        .then((res: any) => {
          if (isSuccessful(res.responseCode)) {
            toast.success(responseMessage.FILE_HAS_BEEN_SENT_TO_YOUR_EMAIL);
            openFile(res.data);
          } else {
            toast.error(responseMessage.FILE_COULD_NOT_BE_GENERATED);
          }
        })
        .catch((err) => {
          console.log("ERROR OCCURRED:::", err);
        }),
      spinnerAreas.transactions
    );
  };

  const openFile = (url: string) => {
    window.open(url, "_blank");
  };

  const filteredItems =
    theTnxs !== undefined &&
    theTnxs.filter(
      (item: any) =>
        JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
        -1
    );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

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
                <div>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle id="export-action-btn">
                      Export
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                      <Dropdown.Item
                        eventKey="EXPORT_AS_PDF"
                        onClick={exportAsPDF}
                      >
                        as PDF
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <>
                <LoadingSpinner areas={spinnerAreas.transactions} />
                <DataTable
                  columns={headers}
                  pagination={true}
                  data={isObject(filteredItems) ? [] : filteredItems}
                  subHeader
                  persistTableHead
                  subHeaderComponent={subHeaderComponent}
                  actions={actionsMemo}
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
