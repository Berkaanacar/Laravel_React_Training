import './App.css';
// import React, { useLayoutEffect } from 'react';
// import ReactDOM from 'react-dom/client';
import { useEffect, useState } from "react";
import axios from 'axios';
import DataList from './components/Datatable';
// import Address from './components/address';
import Select from 'react-select';
import { Modal } from 'react-bootstrap';

function App() {
  // const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  // const [birthday, setBirthday] = useState("");
  // const [birthplace, setBirthplace] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [personalData, setPersonalData] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [districtFilt, setDistrictFilt] = useState([])
  const [disableSelected, setDisableSelected] = useState(true);
  const [type, setType] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [show, setShow] = useState(false);
  // const [addInput, setAddInput] = useState([]);
  const [phone, setPhone] = useState([{ phone: "" }]);
  const [personals, setPersonals] = useState({
    name: "",
    surname: "",
    birthday: "",
    birthplace: "",
    city_id: "",
    district_id: "",
    address_type_id: "",
  })
  // const [personalAddress, setPersonalAddress] = useState({ city: "", district: "" });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [isSaved, setIsSaved] = useState(true);



  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/personal/control").then((response) => {

      setPersonalData(response.data.personals);
      setCity(response.data.cities);
      setDistrict(response.data.districts);
      setType(response.data.addressTypes);

      // setRefresh(false); 


    })
  }, [refresh]);
  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/api/personal/address").then((response) => {
  //     console.log(response);
  //     setCity(response.data.cities);
  //     setDistrict(response.data.districts);
  //     setType(response.data.addressTypes);

  //   })
  // }, [])
  const onChangeCity = (e) => {
    console.log(e)
    setDistrictFilt(district.filter((district) => e.value === district.city_id));
    setDisableSelected(false);
    setPersonals((value) => ({
      ...value,
      city_id: e.value,
    }))
    //     console.log(e.value);    
  }

  const onChangeDistrict = (e) => {
    console.log(e)
    setPersonals((value) => ({
      ...value,
      district_id: e.value,
    }))
    //     console.log(e.value);    
  }
  const onChangeType = (e) => {
    console.log(e)
    setPersonals((value) => ({
      ...value,
      address_type_id: e.value,
    }))
    console.log(e.value);
  }  //veri tabanından ilçe verilerini getirip district içerisine atıcaksın

  const onClickAddType = () => {
    axios.post('http://127.0.0.1:8000/api/personal/addtype', { type: selectType }).then((response) => {
      console.log(response.data);

      setShow(false);
      setRefresh(!refresh);
    })
  }

  const onClickSave = () => {
    axios.post("http://127.0.0.1:8000/api/personal/new", { personals, phone }).then((res) => {
      setRefresh(!refresh)
    })

  };
  const PhoneChange = (e, index) => {
    console.log(e.target.value)
    const { name, value } = e.target;
    const list = [...phone];
    list[index][name] = value;
    setPhone(list);
    console.log(phone);
  };

  const PhoneRemove = (index) => {
    const list = [...phone];
    list.splice(index, 1);
    setPhone(list);
  };

  const PhoneAdd = () => {
    setPhone([...phone, { phone: "" }]);
  };


  return (
    <div className='container'>


      <div className='row'>
        <div className='col-lg-6'>

          <h2>Personal Registration</h2>
          <div className="form-group">
            <label htmlFor="exampleInputName"><h5>Name</h5></label>
            <input type="name" className="form-control" value={personals.name} onChange={(e) => setPersonals((value) => ({ ...value, name: e.target.value }))} placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputSurname"><h5>Surname</h5></label>
            <input type="surname" className="form-control" value={personals.surname} onChange={(e) => setPersonals((value) => ({ ...value, surname: e.target.value }))} placeholder="Enter surname" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputBirthday"><h5>Birthday</h5></label>
            <input type="date" className="form-control" value={personals.birthday} onChange={(e) => setPersonals((value) => ({ ...value, birthday: e.target.value }))} placeholder="Enter birthday" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputBirthplace"><h5>Birthplace</h5></label>
            <input type="birthplace" className="form-control" value={personals.birthplace} onChange={(e) => setPersonals((value) => ({ ...value, birthplace: e.target.value }))} placeholder="Enter birthplace" />
          </div>
        </div>
        <div className='col-lg-6'>
          <div>
            <h2>Add Address</h2>
            <label><h5>Select City</h5></label>
            <Select options={city} placeholder=' Please select city...' onChange={(e) => onChangeCity(e)} />
            <label><h5>Select District</h5></label>
            <Select isDisabled={disableSelected} placeholder=' Please select district...' onChange={(e) => onChangeDistrict(e)} options={districtFilt} />
            <label><h5>Address Type</h5></label>
            <Select options={type} getOptionLabel={(data) => data.label} getOptionValue={data => data.id} onChange={(e) => onChangeType(e)} placeholder=' Please select address type...' />
            {/* getOptionLabel={(data) => data.type}  
              getOptionValue={data => data.id} */}
            <button className='btn btn-primary' onClick={() => handleShow()}>
              AddType
            </button>
            <div className="form-group">
              <form className="App" autoComplete="off">
                <div className="form-field">
                  <label htmlFor="phone">Phone</label>
                  {phone.map((singlePhone, index) => (
                    <div key={index} className="phones">
                      <div className="first-division">

                        <input type="text" name="phone" id="phone" className="form-control" aria-describedby="textHelp" value={singlePhone.phone} onChange={(e) => PhoneChange(e, index)} placeholder="Please enter phone..." />

                        {phone.length - 1 === index && phone.length < 20 && (
                          <button
                            type="button"
                            onClick={PhoneAdd}
                            className="btn btn-primary mt-3">
                            <i className="fa-solid fa-plus"></i>
                            +</button>
                        )}
                      </div>
                      <div className="second-division">
                        {phone.length !== 1 && (
                          <button
                            type="button"
                            onClick={() => PhoneRemove(index)}
                            className="btn btn-danger mt-3 mb-3"><i className="fa-solid fa-minus"></i>-</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* <button className="btn btn-primary">Kaydet</button>
      onClick = {onClickSave} */}
              </form>
            </div><br />

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
          {/* <Address /> */}
        </div>
        <button type="button" className="btn btn-primary" onClick={() => onClickSave()} >Save</button>



        {/* <div className='col-lg-6'>
  <Address/>
  </div> */}
      </div>

      <div className='row'>
        <div className='col-lg-12'>
          <DataList personalData={personalData} />
        </div>
      </div>
    </div>
  );

}

export default App;
