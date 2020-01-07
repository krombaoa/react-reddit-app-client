import React, { useEffect, useReducer } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaReddit, FaCaretUp, FaCaretDown, FaCommentAlt, FaShare, FaStar } from 'react-icons/fa';
import { Facebook } from 'react-content-loader';
import axios from 'axios';
import CardComponent from 'components/card';
import SortList from 'components/sort-list';
import * as type from './types';
import './App.css';

type State = {
  storyItems: Array<type.Story>;
  sortSelected: string;
  modalPop: boolean;
  modalData: any;
  modalComments: Array<type.Comment>;
};

type Action = {
  type: string;
  payload: any;
};

const initialState = {
  storyItems: [],
  sortSelected: 'hot',
  modalPop: false,
  modalData: [],
  modalComments: [],
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-display-items':
      return {
        ...state,
        storyItems: action.payload.data.data.children,
      };
    case 'set-sort-items':
      return {
        ...state,
        sortSelected: action.payload,
      };
    case 'set-modal-items':
      return {
        ...state,
        modalPop: !state.modalPop,
        modalData: action.payload.data,
      };
    case 'set-modal-comments':
      return {
        ...state,
        modalComments: action.payload.data[1].data.children,
      };
    default:
      throw new Error();
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const axiosClient = (value: string, type: string): void => {
    axios.get(`https://www.reddit.com/${value}.json`).then(response => {
      dispatch({
        payload: response,
        type: type,
      });
    });
  };

  useEffect(() => {
    axiosClient(state.sortSelected, `set-display-items`);
  }, [state.sortSelected]);

  const setSortSelected = (sort: string): void => {
    if (state.sortSelected !== sort) {
      dispatch({
        payload: sort,
        type: 'set-sort-items',
      });
    }
  };

  const popUpModal = (item: any): void => {
    if (item !== undefined) {
      axiosClient(item.data.permalink, `set-modal-comments`);
      dispatch({
        payload: item,
        type: 'set-modal-items',
      });
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Facebook />
          <Col sm="6" md={{ size: 9, offset: 0 }}>
            <h1>{state.sortSelected.toUpperCase()}</h1>
            {state.storyItems.map((item, key) => (
              <CardComponent key={key} item={item} popUpModalState={state.modalPop} popUpModal={popUpModal} />
            ))}
          </Col>
          <Col sm="6" md={{ size: 3, offset: 0 }}>
            <div className={'right-panel'}>
              <h1>Sort</h1>
              <SortList sortSelected={setSortSelected} />
            </div>
          </Col>
        </Row>

        <Modal
          isOpen={state.modalPop}
          toggle={(): void => popUpModal({ modal: !state.modalPop, data: state.modalData })}
          style={{ maxWidth: '60%' }}
        >
          <ModalHeader
            className={'clickable'}
            toggle={(): void => popUpModal({ modal: !state.modalPop, data: state.modalData })}
          >
            <FaReddit color={'#ff4500'} size={25} /> ・ {state.modalData.subreddit_name_prefixed} ・ Posted by{' '}
            {state.modalData.author}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <h4>{state.modalData.title}</h4>
              </Col>
              <Col xs="4" sm="2">
                {' '}
                <img width="100%" src={state.modalData.thumbnail} alt="Reddit placeholder modal" />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter style={{ display: 'block' }}>
            <Row>
              <Col>
                <FaCaretUp /> {state.modalData.score} <FaCaretDown />
              </Col>
              <Col className={'clickable'}>
                <FaCommentAlt /> {state.modalData.num_comments} comments
              </Col>
              <Col>
                <a href={`https://www.reddit.com/${state.modalData.permalink}`} target={'_blank'}>
                  <FaShare /> share{' '}
                </a>
              </Col>
              <Col>
                <FaStar /> award{' '}
              </Col>
            </Row>
            <hr />
          </ModalFooter>
          <ModalBody>
            {state.modalData.num_comments !== 0 ? (
              state.modalComments.map(item => {
                return item.kind === 't1' ? (
                  <>
                    <p>
                      <em>Posted by {item.data.author}</em>
                    </p>
                    <p>
                      <strong>{item.data.body}</strong>
                    </p>
                    <hr />{' '}
                  </>
                ) : (
                  <></>
                );
              })
            ) : (
              <p>no comment</p>
            )}
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default App;
