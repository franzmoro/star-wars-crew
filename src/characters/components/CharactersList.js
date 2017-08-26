import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import * as globalSelectors from '../../app/index.selectors';
import * as actionCreators from '../index.actionCreators';
import Character from './Character';
import Spinner from 'react-loader';

class CharactersList extends Component {
  componentDidMount() {
    const {
      characters,
      retrieveCharacters,
    } = this.props;

    const characterIds = Object.keys(characters);
    if (!characterIds.length) {
      retrieveCharacters();
    }
  }

  render() {
    // TODO refresh button
    // TODO modal for expanded character info
    // TODO spinner for loading info
    // TODO Favorite character filter??
    const {
      characters,
      sortedCharacterIds,
      // favouriteCharacterIds,
      isLoading,
      loadingError,
      // expandedCharacterId,
    } = this.props;

    const showTable = Boolean(sortedCharacterIds.length);
    return (
      <div>
        {isLoading && <p>Jumping to Hyperspace...</p>}
        <Spinner loaded={!isLoading} />
        {/* TODO api down image? */}
        {loadingError
          ? <p>{'Sorry, there has been an error. We won\'t fail you again!'}</p>
          : (showTable &&
            <Table striped bordered condensed hover>
              <thead>
                <tr>{[
                  'Name', 'Gender', 'Birth Year',
                  'Height', 'Mass', 'Eye Color', 'Hair Color', 'Skin Color',
                  '# Films featured', '# Vehicles',
                ].map(headerName => <th>{headerName}</th>)}
                </tr>
              </thead>
              <tbody>
                {sortedCharacterIds.map((characterId) => {
                  const character = characters[characterId];
                  return <Character key={characterId} {...character} />;
                })}
              </tbody>
            </Table>
          )
        }
      </div>
    );
  }
}

CharactersList.propTypes = {
  characters: PropTypes.object.isRequired,
  favouriteCharacterIds: PropTypes.array.isRequired,
  sortedCharacterIds: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingError: PropTypes.string,
  expandedCharacterId: PropTypes.number,
  retrieveCharacters: PropTypes.func.isRequired,
};

CharactersList.defaultProps = {
  loadingError: undefined,
  expandedCharacterId: undefined,
};

const mapStateToProps = state => ({
  characters: globalSelectors.getCharacters(state),
  favouriteCharacterIds: globalSelectors.getFavouriteCharacterIds(state),
  sortedCharacterIds: globalSelectors.getSortedCharacterIds(state),
  isLoading: globalSelectors.isLoadingCharacters(state),
  loadingError: globalSelectors.getLoadingError(state),
  expandedCharacterId: globalSelectors.getExpandedCharacterId(state),
});

const mapDispatchToProps = dispatch => ({
  retrieveCharacters: () => dispatch(actionCreators.retrieveCharacters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
