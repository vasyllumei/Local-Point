function Dropdown({ profileClick, onClickRefresh, onClickLogout }) {
  return (
    profileClick && (
      <div className="absolute bg-[#B7B7A4] p-3 shadow-md mt-2 z-30 rounded-md">
        <h2
          className="cursor-pointer min-w-[60px] hover:text-[#283618] hover:font-bold"
          onClick={onClickRefresh}
        >
          Refresh
        </h2>
        <h2
          className="cursor-pointer hover:text-[#283618] hover:font-bold"
          onClick={onClickLogout}
        >
          Logout
        </h2>
      </div>
    )
  );
}
export default Dropdown;
