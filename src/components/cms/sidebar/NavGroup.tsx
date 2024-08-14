import { ListSubheader, styled, Theme } from "@mui/material";

const NavGroup = ({ item }: { item: string }) => {
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: "700",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: "26px",
    padding: "3px 12px",
  }));
  return <ListSubheaderStyle>{item}</ListSubheaderStyle>;
};

export default NavGroup;
