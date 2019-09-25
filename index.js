import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Downshift from 'downshift';
import styles from './Autocomplete.css';
import { SEARCH_QUERY_PARAM } from '~core/constants';
import { noop } from '~core/utils';

const Autocomplete = ({
  placeholderText,
  refInput,
  inputId,
  query,
  completeResults,
  handleComplete,
  handleChange,
  inputClass
}) => (
  <Downshift
    id="autocomplete"
    onChange={handleComplete}
    itemToString={item => (item || '')}
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      highlightedIndex,
    }) => (
      <div className={styles.autocomplete}>
        <input
          {...getInputProps()}
          className={inputClass}
          id={inputId}
          name={SEARCH_QUERY_PARAM}
          onChange={handleChange}
          placeholder={placeholderText}
          ref={refInput}
          tabIndex="0"
          type="text"
          value={query}
          autoComplete="off"
        />
        <ul 
          {...getMenuProps()}
          className={styles['autocomplete-list']}
        >
          {completeResults.length ? completeResults
            .map((item, index) => (
              <li
                {...getItemProps({
                  key: `complete-item-${index}`,
                  index,
                  item,
                  style: { backgroundColor: highlightedIndex === index ? '#EFF1F2' : null },
                })}
              >
                {item}
              </li>
            ))
          : null}
        </ul>
      </div>
    )}
  </Downshift>
);

Autocomplete.propTypes = {
  /**
   * Text to display in the search field when it's empty.
   */
  placeholderText: PropTypes.string,

  /**
   * Ref function for the input field DOM element.
   */
  refInput: PropTypes.func,

  /**
   * The current search query (if the user is currently viewing a search
   * results page).
   */
  currQuery: PropTypes.string,

  /**
   * Input field id to match label
   */
  inputId: PropTypes.string,

  /**
   * Input field query string
   */
  query: PropTypes.string,

  /**
   * Autocomplete result array
   */
  completeResults: PropTypes.array,

  /**
   * Event handler function for autocomplete.
   */
  handleComplete: PropTypes.func,

  /**
   * Event handler function for input field.
   */
  handleChange: PropTypes.func,

  /**
   * Classnamne for input field
   */
  inputClass: PropTypes.string
};

Autocomplete.defaultProps = {
  placeholderText: '',
  refInput: noop,
  currQuery: '',
  inputId: '',
  query: '',
  completeResults: [],
  handleComplete: noop,
  handleChange: noop,
  inputClass: ''
};

export default withStyles(styles)(Autocomplete);