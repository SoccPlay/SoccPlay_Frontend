import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AttachMoney,
  DateRange,
  Payment,
  LocationOn,
} from "@mui/icons-material";

const Invoice = ({ data }) => {
  return (
    <Box>
      <Typography variant="h3">
        Because sometimes, all you need is something simple.
      </Typography>
      <Typography>
        Find the code on{" "}
        <a href="https://github.com/sparksuite/simple-html-invoice-template">
          GitHub
        </a>
        . Licensed under the{" "}
        <a href="http://opensource.org/licenses/MIT" target="_blank">
          MIT license
        </a>
        .
      </Typography>
      <Box className="invoice-box">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="top">
                <TableCell colSpan={2}>
                  <Table>
                    <TableRow>
                      <TableCell className="title">
                        <img
                          src="./images/logo.png"
                          alt="Company logo"
                          style={{ width: "100%", maxWidth: 300 }}
                        />
                      </TableCell>
                      <TableCell>
                        Invoice #: 123
                        <br />
                        Created: January 1, 2015
                        <br />
                        Due: February 1, 2015
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="information">
                <TableCell colSpan={2}>
                  <Table>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle1">
                          Sparksuite, Inc.
                        </Typography>
                        <Typography>12345 Sunny Road</Typography>
                        <Typography>Sunnyville, TX 12345</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1">Acme Corp.</Typography>
                        <Typography>John Doe</Typography>
                        <Typography>john@example.com</Typography>
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableCell>
              </TableRow>
              <TableRow className="heading">
                <TableCell>Payment Method</TableCell>
                <TableCell>Check #</TableCell>
              </TableRow>
              <TableRow className="details">
                <TableCell>
                  <Payment />
                  Check
                </TableCell>
                <TableCell>1000</TableCell>
              </TableRow>
              <TableRow className="heading">
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
              <TableRow className="item">
                <TableCell>Website design</TableCell>
                <TableCell>
                  <AttachMoney />
                  $300.00
                </TableCell>
              </TableRow>
              <TableRow className="item">
                <TableCell>Hosting (3 months)</TableCell>
                <TableCell>
                  <AttachMoney />
                  $75.00
                </TableCell>
              </TableRow>
              <TableRow className="item last">
                <TableCell>Domain name (1 year)</TableCell>
                <TableCell>
                  <AttachMoney />
                  $10.00
                </TableCell>
              </TableRow>
              <TableRow className="total">
                <TableCell />
                <TableCell>
                  Total: <AttachMoney />
                  $385.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Invoice;
