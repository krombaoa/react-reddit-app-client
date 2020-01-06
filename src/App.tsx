import React, { useEffect, useReducer } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import CardComponent from 'components/card';
import SortList from 'components/sort-list';
import * as type from './types';
import './App.css';

type State = {
  storyItems: Array<type.Story>;
};

type Action = {
  type: string;
  payload: [];
};

const initialState = {
  storyItems: [],
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-navigation-items':
      return {
        ...state,
        storyItems: action.payload,
      };
    default:
      throw new Error();
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get('https://www.reddit.com/hot.json').then(response => {
      dispatch({
        payload: response.data.data.children,
        type: 'set-navigation-items',
      });
    });
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col sm="6" md={{ size: 9, offset: 0 }}>
            <h1>Hot</h1>
            {state.storyItems.map((item, key) => (
              <CardComponent key={key} item={item} />
            ))}
          </Col>
          <Col sm="6" md={{ size: 3, offset: 0 }}>
            <div className={'right-panel'}>
              <h1>Sort</h1>
              <SortList />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
