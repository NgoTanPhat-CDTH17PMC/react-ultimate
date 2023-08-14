import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Card.scss";
import _, { propertyOf } from "lodash";

const CardDetail = (props) => {
  const { show, setShow, dataView } = props;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const keyMapping = {
    name: "Name (Tên)",
    number: "Number (Số)",
    arcana: "Arcana (Arrcana)",
    suit: "Suit (Loạt)",
    fortune_telling: "Fortune Telling (Tiên tri về tương lai)",
    keywords: "Keywords (Từ khóa)",
    meanings: "Meanings (Ý nghĩa)",
    description: "Description (Mô tả chung)",
    light: "Light (Mặt sáng)",
    shadow: "Shadow (Mặt tối)",
    Archetype: "Archetype (Nguyên mẫu)",
    Hebrew_Alphabet: "Hebrew Alphabet (Bảng chữ cái Hebrew)",
    Numerology: "Numberology (Số học)",
    Elemental: "Elemental (Yếu tố)",
    Mythical_Spiritual: "Mythycal/Spiritual (Thần thoại/Tâm linh)",
    Questions_to_Ask: "Questions To Ask (Câu hỏi để hỏi)",
  };

  const numberMapping = {
    0: "O",
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    11: "XI",
    12: "XII",
    13: "XIII",
    14: "XIV",
    15: "XV",
    16: "XVI",
    17: "XVII",
    18: "XVIII",
    19: "XIX",
    20: "XX",
    21: "XXI",
    22: "XXII",
    23: "XXIII",
    24: "XXIV",
    25: "XXV",
  };

  const countNestedObjectsAndArrays = (data) => {
    let count = 0;

    const traverse = (item) => {
      if (typeof item === "object" && item !== null) {
        count++;
        if (Array.isArray(item)) {
          item.forEach((subItem) => traverse(subItem));
        } else {
          for (const key in item) {
            traverse(item[key]);
          }
        }
      }
    };

    traverse(data);
    return count;
  };

  const renderKeyValue = (key, value) => {
    const count = countNestedObjectsAndArrays(value);
    const key_replace = key.replace(/[^a-zA-Z0-9_]/g, "_");
    if (typeof value === "object" && value !== null && key !== "img") {
      return (
        <div key={key} className="p-line">
          <span className="p-title">{keyMapping[key_replace] || key}:</span>
          <div
            className="nested-values px-3"
            data-object={!Array.isArray(value)}
          >
            {Object.entries(value).map(([nestedKey, nestedValue]) => (
              <div key={nestedKey} className="nested-line">
                {renderKeyValue(nestedKey, nestedValue)}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      if (key !== "img") {
        return (
          <div key={key} className="p-line" data-key={key}>
            <span className="p-title">{keyMapping[key_replace] || key}:</span>{" "}
            <span className="p-content">
              {key === "number" ? numberMapping[value] || value : value}
            </span>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setName(dataView.name);

      const imagePath = require(`../../../assets/cards/${dataView.img}`);
      setImage(imagePath);
    }
  }, [dataView]);

  return (
    <>
      <Modal
        dialogClassName="modal-90w"
        show={show}
        onHide={handleClose}
        className="modal-card-list"
      >
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div className="card-image col-4 px-5">
              <img
                src={image}
                alt={name}
                className="card-img-top"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="card-description col-8">
              <div className="tarot-card d-flex flex-column gap-2">
                {Object.entries(dataView).map(([key, value], index) =>
                  renderKeyValue(key, value, index)
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary has-custom"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardDetail;
