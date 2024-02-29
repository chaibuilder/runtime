type LinkProps = {
  inBuilder?: boolean;
  style?: Record<string, string>;
  href: string;
  children: any;
};
const ChaiBuilderLink = ({
  inBuilder = false,
  style = {},
  href,
  children,
}: LinkProps) => {
  if (inBuilder) {
    return (
      <span data-simulate={"a"} {...style}>
        {children}
      </span>
    );
  }

  return (
    <a href={href} {...style}>
      {children}
    </a>
  );
};

export default ChaiBuilderLink;
