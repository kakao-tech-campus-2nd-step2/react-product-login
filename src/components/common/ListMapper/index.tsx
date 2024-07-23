type ItemComponentProps<T> = {
  ref?: React.Ref<HTMLDivElement>;
  item: T;
  index: number;
};

type ListMapperProps<T> = {
  items?: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Wrapper?: React.FC<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapperProps?: any;
  ItemComponent: (props: ItemComponentProps<T>) => React.JSX.Element;
  width?: string;
  height?: string;
  infinite?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
};

function ListMapper<T>({
  items = [],
  Wrapper = (props) => <div {...props} />,
  wrapperProps = {},
  ItemComponent,
  width = '100%',
  height = '250px',
}: ListMapperProps<T>): React.JSX.Element {
  if (items.length === 0) {
    return (
      <div
        style={{
          width: width,
          height: height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          color: '#a0a0a0',
        }}
      >
        Empty
      </div>
    );
  } else {
    return (
      <Wrapper {...wrapperProps}>
        {items.map((item, index) => (
          <ItemComponent key={index} item={item} index={index} />
        ))}
      </Wrapper>
    );
  }
}

export default ListMapper;
