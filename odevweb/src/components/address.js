import axios from 'axios';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Appjs from "../App";

function Address() {
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [districtFilt, setDistrictFilt] = useState([])
  const [disableSelected, setDisableSelected] = useState(true);
  const [type, setType] = useState([]);
  const [selectType, setSelectType] = useState()
  const [show, setShow] = useState(false);
  const [personalAddress, setPersonalAddress] = useState({ city: "", district: "" });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/personal/address").then((response) => {
      console.log(response.data);
      setCity(response.data.cities);
      setDistrict(response.data.districts);
      setType(response.data.addressTypes);
    })
  }, [])
  const onChangeCity = (e) => {
    console.log(e)
    setDistrictFilt(district.filter((district) => e.value === district.city_id));
    setDisableSelected(false);
    //     console.log(e.value);    
  } //veri tabanından ilçe verilerini getirip district içerisine atıcaksın

  const onClickAddType = () => {
    axios.post('http://127.0.0.1:8000/api/personal/addtype', { type: selectType }).then((response) => {
      console.log(response);
      setType((type) => [...type, response.data]);
      setShow(false);
    })
  }

  return (
    <div>
      <h2>Add Address</h2>
      <label><h5>Select City</h5></label>
      <Select options={city} placeholder=' Please select city...' onChange={(e) => onChangeCity(e)} />
      <label><h5>Select District</h5></label>
      <Select isDisabled={disableSelected} placeholder=' Please select district...' options={districtFilt} />
      <label><h5>Address Type</h5></label>
      <Select options={type} getOptionLabel={(data) => data.type} getOptionValue={data => data.id} placeholder=' Please select address type...' />

      <button className='btn btn-primary' onClick={handleShow}>
        AddType
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="type" className="form-control" id="exampleInputAddressType" value={selectType} onChange={(e) => setSelectType(e.target.value)} placeholder="Please enter type..." />
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-warning' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-success' onClick={onClickAddType}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

    </div>


  )
}

export default Address