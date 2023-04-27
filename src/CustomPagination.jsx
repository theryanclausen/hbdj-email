import { styled } from "@mui/system";
import TablePagination, {
  tablePaginationClasses as classes,
} from "@mui/material/TablePagination";

const CustomPagination = styled(TablePagination)(
  ({ theme }) => `
    & .${classes.selectLabel} {
      display: none;
    }
    & .${classes.select} {
      display: none;
    }
    & .${classes.selectIcon} {
      display: none;
    }
    `
);

export default CustomPagination;
