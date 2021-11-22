import React, { useEffect, useMemo, useState } from "react";
import {
  callToExportAsCSV,
  callToExportAsPDF,
  callTofetchEkedpTransaction,
} from "../../services/transactions-service";
import { trackPromise } from "react-promise-tracker";
import { spinnerAreas } from "../../common/constants";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { isObject, isSuccessful } from "../../common/helpers";
import DataTable, { TableColumn } from "react-data-table-component";
import ViewTnxDetailsModal from "./ViewTnxDetailsModal";
import WordWrap from "../../components/WordWrap";
import VBadge from "../../components/VBadge";
import FilterComponent from "../../components/FilterComponent";
import { responseMessage } from "../../common/response-message";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

type DataRow = {
  id: string;
  amount: number;
  paymentReference: string;
  accountType: string;
  accountNumber: string;
  meterNumber: string;
  orderId: string;
  partnerChannel: string;
  paymentPurpose: string;
  responseCode: string;
  responseMessage: string;
  stdToken: any;
  bsstToken: string;
  statusCode: string;
  statusCodeValue: string;
  createdAt: string;
  updatedAt: string;
};

const Export = ({ onExport }: any) => (
  <Button onClick={(e: any) => onExport(e.target.value)}>Export as CSV</Button>
);

const Transactions = () => {
  const [theTnxs, setTheTnxs] = useState(Object.assign([]));
  const [showTnxDetailsModal, setShowViewTnxDetailsModal] = useState(false);
  const [currentTnxDetails, setCurrentTnx] = useState(Object.assign({}));
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  useEffect(() => {
    trackPromise(
      callTofetchEkedpTransaction()
        .then((res: any) => {
          if (isSuccessful(res.responseCode)) {
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

  const openViewTnxDetailsModal = (_event: any, row: any) => {
    setCurrentTnx(row);
    setShowViewTnxDetailsModal(true);
  };

  const closeViewTnxDetailsModal = () => {
    setShowViewTnxDetailsModal(false);
  };

  const headers: TableColumn<DataRow>[] = React.useMemo(
    () => [
      {
        name: "S/N",
        sortable: true,
        cell: (_row: any, index: number) => index + 1,
        maxWidth: "5%",
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,
        maxWidth: "15%",
      },
      {
        name: "Account number",
        selector: (row) => row.accountNumber,
        sortable: true,
        maxWidth: "15%",
      },
      {
        name: "Payment reference",
        selector: (row) => row.paymentReference,
        cell: (row) => <WordWrap word={row.paymentReference} />,
        sortable: true,
        maxWidth: "20%",
      },
      {
        name: "Account type",
        cell: (row) => <WordWrap word={row.accountType} />,
        selector: (row) => row.accountType,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "Status",
        cell: (row) => (
          <VBadge responseCode={row.responseCode} statusCode={row.statusCode} />
        ),
        selector: (row) => row.responseCode,
        sortable: true,
        maxWidth: "5%",
      },
      {
        name: "Date created",
        selector: (row) => row.createdAt,
        cell: (row) => <WordWrap word={row.createdAt} />,
        sortable: true,
        maxWidth: "10%",
      },
      {
        name: "Actions",
        cell: (row: any, _e: any) => (
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle id="transaction-action-btn">
              Action
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <Dropdown.Item
                eventKey="1"
                onClick={(e: any) => openViewTnxDetailsModal(e, row)}
              >
                View details
              </Dropdown.Item>
              {/* <Dropdown.Item eventKey="2">Print receipt</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Dispute</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        ),
        allowOverflow: true,
        button: true,
        maxWidth: "20%",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function convertArrayOfObjectsToCSV(array: any) {
    let result: any;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(theTnxs[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item: { [x: string]: any }) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array: any) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(theTnxs)} />,
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

  // const exportAsCSV = () => {
  //   trackPromise(
  //     callToExportAsCSV()
  //       .then((res: any) => {
  //         if (isSuccessful(res.responseCode)) {
  //           toast.success(responseMessage.FILE_HAS_BEEN_SENT_TO_YOUR_EMAIL);
  //           openFile(res.data);
  //         } else {
  //           toast.error(responseMessage.FILE_COULD_NOT_BE_GENERATED);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("ERROR OCCURRED:::", err);
  //       }),
  //     spinnerAreas.transactions
  //   );
  // };

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
      {showTnxDetailsModal && (
        <ViewTnxDetailsModal
          show={showTnxDetailsModal}
          handle_close={closeViewTnxDetailsModal}
          details={currentTnxDetails}
        />
      )}
      <div className="page-header">
        <h3 className="page-title"> Transactions </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()} className="text-white">
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
                      {/* <Dropdown.Item
                        eventKey="EXPORT_AS_CSV"
                        onClick={exportAsCSV}
                      >
                        as CSV
                      </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <DataTable
                columns={headers}
                pagination={true}
                data={isObject(filteredItems) ? [] : filteredItems}
                subHeader
                persistTableHead
                subHeaderComponent={subHeaderComponent}
                actions={actionsMemo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
