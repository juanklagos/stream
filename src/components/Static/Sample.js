import React, { Component } from "react";

// import {Link} from 'react-router-dom';

class Sample extends Component {
  render() {
    return (
      <div className="top-bottom-spacing">
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#myModal"
        >
          confirmation modal
        </button>

        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#spam-popup"
        >
          spam
        </button>

        <div className="text-center">
          <img
            src="../assets/img/no-result.png"
            className="no-result-img"
            alt="no_result"
          />
          <h4 className="mt-3 mb-3">No results found</h4>
        </div>

        <div className="loader" />

        <div className="modal fade confirmation-popup" id="myModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Delete Account</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <h5>are you sure you want to delete Account?</h5>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-link"
                  data-dismiss="modal"
                >
                  No
                </button>
                <button type="button" className="btn btn-danger">
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade confirmation-popup" id="spam-popup">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title">Report This Video</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  <p>
                    Note:If you report this video, you won't see again the same
                    video in anywhere in your account except "Spam Videos". If
                    you want to continue to report this video as same. Click
                    continue and proceed the same.
                  </p>

                  <div className="form-check">
                    <input type="radio" id="test1" name="radio-group" checked />
                    <label for="test1">Sexual content</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" id="test2" name="radio-group" />
                    <label for="test2">Violent or repulsive content.</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" id="test3" name="radio-group" />
                    <label for="test3">Hateful or abusive content.</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" id="test4" name="radio-group" />
                    <label for="test4">Harmful dangerous acts.</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" id="test5" name="radio-group" />
                    <label for="test5">Child abuse.</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" id="test6" name="radio-group" />
                    <label for="test6">Spam or misleading.</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" id="test7" name="radio-group" />
                    <label for="test7">Infringes my rights.</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" id="test8" name="radio-group" />
                    <label for="test8">Captions issue.</label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-danger">
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sample;
