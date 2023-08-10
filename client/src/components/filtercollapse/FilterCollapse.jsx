import { Select } from "antd";
// import "./filtercollapse.css";

const { Option } = Select;

const handleChange = (value) => {
 
};

const FilterCollapse = ({ data }) => {
  return (
    <div className="filtercollapse">
      <Select
        defaultValue="option1"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
    </div>
  );
};

export default FilterCollapse;
