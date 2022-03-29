export const Header = ({ title }) => {
    return (
        <header>
            <div>{title}</div>
        </header>
    );
};

Header.defaultProps = {
    title: 'Default List',
};

export default Header;
