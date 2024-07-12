import React, { useEffect, useState } from "react";

import {
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useStripe } from "../../../shared/hooks/stripe-hook";

const UserBilling = ({ user }) => {
  const [billingPage, setBillingPage] = useState({
    page: 1,
    limit: 5,
  });
  const [totalPages, setTotalPages] = useState(1);

  const { getStripeBillingData } = useStripe();

  const { data: billing, isLoading: billingIsLoading } = useQuery({
    queryKey: ["userBilling", billingPage.page, billingPage.limit],
    queryFn: () =>
      getStripeBillingData(user?._id, billingPage.page, billingPage.limit),
    enabled: Boolean(user && user?._id),
  });

  useEffect(() => {
    if (billing && billing?.user?.length > 0) {
      setTotalPages(billing?.totalPages);
    }
  }, [billing]);

  const handleBillingPageChange = (page, limit) => {
    setBillingPage({
      page: page,
      limit: limit,
    });
  };

  //temp fix - add credits received to billing model
  const creditsReceived = {
    750: 5,
    1200: 15,
    1800: 30,
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Package</TableCell>
            <TableCell>Credits Amount</TableCell>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Credits Received</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {billing &&
            !billingIsLoading &&
            billing?.user?.map((userBilling, i) => (
              <TableRow key={userBilling?._id}>
                <TableCell>{userBilling?.productName}</TableCell>
                <TableCell>{userBilling?.purchaseAmount / 100}</TableCell>
                <TableCell>{userBilling?.purchaseDate}</TableCell>
                <TableCell>
                  {creditsReceived[userBilling?.purchaseAmount / 100]
                    ? creditsReceived[userBilling?.purchaseAmount / 100]
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          {billingIsLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Stack alignItems="end">
        <Pagination
          page={billingPage.page}
          count={totalPages}
          onChange={(event, page) => handleBillingPageChange(page, 5)}
        />
      </Stack>
    </TableContainer>
  );
};

export default UserBilling;
