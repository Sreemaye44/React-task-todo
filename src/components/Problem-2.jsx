import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Problem2 = () => {
  const [numbers, setNumbers] = useState([]);
  const [unFilteredNumbers, setUnFilteredNumbers] = useState([]);
  const [showEvenOnly, setShowEvenOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  

  useEffect(() => {
    fetch("https://contact.mediusware.com/api/contacts/")
      .then((response) => response.json())
      .then((data) => {
        const phone = data.results;
        console.log(phone);
        setNumbers(phone);

        setUnFilteredNumbers(phone);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleButtonClick = () => {
    setShow(true);
    const filtered = numbers.filter((number) => number.country.id === 1);
    setNumbers(filtered);
  };
  const handleShow = () => {
    setShow(true);
    setNumbers(unFilteredNumbers);
  };

  const handleCheckboxChange = () => {
    setShowEvenOnly(!showEvenOnly);
    filterNumbers(!showEvenOnly);
  };

  const filterNumbers = (isEven) => {
    if (isEven === false) {
      setNumbers(unFilteredNumbers);
    } else {
      const filtered = numbers.filter((number) => {
        return isEven ? number.id % 2 === 0 : parsedNumber % 2 !== 0;
      });
      setNumbers(filtered);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterNumbersBySearch(query);
  };

  const filterNumbersBySearch = (query) => {
    const filtered = numbers.filter((number) => {
      const phoneNumber = number.phone.toLowerCase();
      return phoneNumber.includes(query);
    });
    setNumbers(filtered);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Button onClick={handleShow}>All Contacts</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <input
                type="text"
                placeholder="Search Numbers..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Modal.Header>
            <Modal.Body>
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                  </tr>
                </thead>
                <tbody>
                  {numbers.map((number) => (
                    <tr>
                      <td>{number.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <label>
                Only Even:
                <input
                  type="checkbox"
                  checked={showEvenOnly}
                  onChange={handleCheckboxChange}
                />
              </label>
            </Modal.Footer>
          </Modal>
          <button
            onClick={handleButtonClick}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
