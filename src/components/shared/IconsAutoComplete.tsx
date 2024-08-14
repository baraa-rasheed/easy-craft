import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import * as Icons from "@mui/icons-material";
import { Box, InputAdornment } from "@mui/material";

const AppIcons = Object.keys(Icons)
  .filter((name) => name.includes("Outlined"))
  .map((icon) => icon.replace("Outlined", ""));

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  const Icon = Icons[dataSet[1] as keyof typeof Icons];

  return (
    <Box
      display="flex"
      gap={2}
      alignItems={"center"}
      style={inlineStyle}
      {...dataSet[0]}
    >
      <Icon color="primary" />
      {`${dataSet[1]}`}
    </Box>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    },
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactElement) => {
    if (child.hasOwnProperty("group")) return 48;
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          width="100%"
          ref={gridRef}
          overscanCount={5}
          innerElementType="ul"
          itemCount={itemCount}
          outerElementType={OuterElementType}
          height={getHeight() + 2 * LISTBOX_PADDING}
          itemSize={(index) => getChildSize(itemData[index])}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const renderInput = (params) => {
  const Icon = Icons[params?.inputProps?.value as keyof typeof Icons];
  return (
    <TextField
      {...params}
      label="Select Icon"
      InputProps={{
        ...params.InputProps,
        startAdornment: Icon ? (
          <InputAdornment position="start">
            <Icon color="primary" />
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default function IconsAutoComplete({
  iconName,
  onIconChange,
}: {
  iconName: string | undefined;
  onIconChange: (iconName: string) => void;
}) {
  return (
    <Autocomplete
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      noOptionsText="No Icons Found"
      options={AppIcons}
      value={iconName}
      onChange={(_, value) => onIconChange(value ?? "")}
      renderInput={renderInput}
      renderOption={(props, option, state) =>
        [props, option, state.index] as React.ReactNode
      }
    />
  );
}
