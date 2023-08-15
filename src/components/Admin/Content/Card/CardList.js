import { useEffect, useState } from "react";
import CardDetail from "./CardDetail";
import CardListJson from "../../../../assets/cards/tarot-images.json"; // Import JSON file
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

const CardList = (props) => {
  const [showModalCardDetail, setShowModalCardDetail] = useState(false);
  const [dataView, setDataView] = useState({});
  const [groupedCards, setGroupedCards] = useState([{}]);
  const [activeTab, setActiveTab] = useState("arcana");
  const [randomCards, setRandomCards] = useState([]);
  const [showRandomCards, setShowRandomCards] = useState(false);

  const keyMapping = {
    Major_Arcana: "Bộ ẩn chính (Major Arcana)",
    Minor_Arcana: "Bộ ẩn phụ (Minor Arcana)",
    Cups: "Cốc (Cups)",
    Swords: "Kiếm (Swords)",
    Wands: "Gậy (Wands)",
    Pentacles: "Tiền (Pentacles)",
  };

  const handleClickViewDetail = (card) => {
    setShowModalCardDetail(true);
    setDataView(card);
  };

  const getRandomCards = () => {
    const shuffledCards = [...CardListJson.cards].sort(
      () => 0.5 - Math.random()
    );
    const selectedRandomCards = shuffledCards.slice(0, 5);
    setRandomCards(selectedRandomCards);
    setShowRandomCards(true);

    console.log(selectedRandomCards);
  };

  useEffect(() => {
    const groupedCards_first = [{}];
    CardListJson &&
      CardListJson.cards.length > 0 &&
      CardListJson.cards.forEach((card) => {
        const { arcana, suit } = card;
        if (!groupedCards_first[arcana]) {
          groupedCards_first[arcana] = {};
        }
        if (!groupedCards_first[arcana][suit]) {
          groupedCards_first[arcana][suit] = [];
        }
        groupedCards_first[arcana][suit].push(card);
      });

    setGroupedCards(groupedCards_first);
  }, []);

  return (
    <div className="card-list-container container">
      <h1 className="title">Tarot Card List</h1>
      <p className="description">
        {CardListJson.description
          ? CardListJson.description
          : "There is no description!"}
      </p>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary" onClick={() => getRandomCards()}>
          Get Random Cards
        </button>
      </div>
      <div className="d-flex flex-column">
        <Tabs id="justify-tab-example" className="mb-3 list-arcana" justify>
          {Object.entries(groupedCards).map(([arcana, suits], arcana_index) => {
            return (
              arcana !== "0" && (
                <Tab
                  eventKey={arcana}
                  title={arcana}
                  key={arcana_index}
                  className="tab-arcana"
                >
                  <div className={arcana}>
                    {/* <h2>{arcana}</h2> */}

                    {Object.entries(suits).length > 1 ? (
                      <Tabs id="justify-tab-example" className="mb-3" justify>
                        {Object.entries(suits).map(
                          ([suit, cards], suits_index) => (
                            <Tab eventKey={suit} title={suit} key={suits_index}>
                              <div className="d-flex flex-row flex-wrap justify-content-center gap-xl-3 gap-sm-2">
                                {cards.map((card, index) => {
                                  const imagePath = require(`../../../../assets/cards/${card.img}`);
                                  return (
                                    <div
                                      className="card col-lg-2 col-md-4 col-sm-6"
                                      key={index}
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleClickViewDetail(card)
                                      }
                                    >
                                      <img
                                        src={imagePath}
                                        alt={card.name}
                                        className="card-img-top"
                                      />
                                      <div className="card-body p-2">
                                        <h6 className="card-title">
                                          {card.name}
                                        </h6>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </Tab>
                          )
                        )}
                      </Tabs>
                    ) : (
                      Object.entries(suits).map(([suit, cards]) => (
                        <div
                          key={suit}
                          className="d-flex flex-row flex-wrap justify-content-center gap-xl-3 gap-sm-2"
                        >
                          {cards.map((card, index) => {
                            const imagePath = require(`../../../../assets/cards/${card.img}`);
                            return (
                              <div
                                className="card col-lg-2 col-md-4 col-sm-6"
                                key={index}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleClickViewDetail(card)}
                              >
                                <img
                                  src={imagePath}
                                  alt={card.name}
                                  className="card-img-top"
                                />
                                <div className="card-body p-2">
                                  <h6 className="card-title">{card.name}</h6>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))
                    )}
                  </div>
                </Tab>
              )
            );
          })}
        </Tabs>

        {/* {CardListJson &&
          CardListJson.cards.length > 0 &&
          CardListJson.cards.map((card, index) => {
            const imagePath = require(`../../../../assets/cards/${card.img}`);
            return (
              <div
                className="card col-2"
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleClickViewDetail(card)}
              >
                <img src={imagePath} alt={card.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                </div>
              </div>
            );
          })} */}
      </div>

      <CardDetail
        show={showModalCardDetail}
        setShow={setShowModalCardDetail}
        dataView={dataView}
      />
    </div>
  );
};

export default CardList;
