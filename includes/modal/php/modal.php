<?php
//
include("dependencies.php");
//
function formModal()
{
  /*
    if (!getLoggedInVariable() && empty($_SESSION)) {
        if (!empty(getPOST())) {
            if (getPOST("submit") == "register") {
                setData();
            }
            if (getPOST("submit") == "login") {
                getData();
            }
        }
  */
        //
        $formModal = "
        <div class='modal__container'>
          <!-- First modal dialog -->
          <div class='modal fade' id='loginModal' aria-hidden='true' aria-labelledby='...' tabindex='-1'>
            <div class='modal-dialog modal-dialog-centered'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title'>Login</h5>
                </div>
                <div class='modal-body'>
                  <form method='post'>
                    <div class='mb-3' data-form-input='email'>
                      <label for='loginEmail' class='form-label'>Email address</label>
                      <input type='email' name='email' class='form-control' id='loginEmail' aria-describedby='emailHelp'>
                    </div>
                    <div class='mb-3' data-form-input='password'>
                      <label for='loginPassword' class='form-label'>Password</label>
                      <input type='password' name='password' class='form-control' id='loginPassword'>
                    </div>
                    <div class='mb-3 form-check'>
                      <input type='checkbox' class='form-check-input' id='loginRememberCheckbox' name='rememberCheckbox'>
                      <label class='form-check-label' for='loginRememberCheckbox'>Remember me</label>
                    </div>
                    <div class='mb-3'>
                      <button type='submit' name='submit' value='login' class='btn btn-primary'>login</button>
                    </div>
                  </form>
                </div>
                <div class='modal-footer'>
                  <!-- Toogle to second dialog -->
                  <p class='form__other'>Don't have an account yet? <a href='javascript:void(0)' class='link-primary text-decoration-none cursor-pointer' data-bs-target='#registerModal' data-bs-toggle='modal' data-bs-dismiss='modal'>Register</a></p>
                </div>
              </div>
            </div>
          </div>
          <!-- Second modal dialog -->
          <div class='modal fade' id='registerModal' aria-hidden='true' aria-labelledby='...' tabindex='-1'>
            <div class='modal-dialog modal-dialog-centered'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title'>Register</h5>
                </div>
                <div class='modal-body'>
                  <form method='post'>
                    <div class='mb-3' data-form-input='email'>
                      <label for='registerEmali' class='form-label'>Email address</label>
                      <input type='email' name='email' class='form-control' id='registerEmali' aria-describedby='emailHelp'>
                    </div>
                    <div class='mb-3' data-form-input='password'>
                      <label for='registerPassword' class='form-label'>Password</label>
                      <input type='password' name='password' class='form-control' id='inputPassword'>
                    </div>
                    <div class='mb-3'>
                      <button type='submit' name='submit' value='register' class='btn btn-primary'>register</button>
                    </div>
                  </form>
                </div>
                <div class='modal-footer'>
                  <!-- Toogle to second dialog -->
                  <p class='form__other'>Already have an account? <a href='javascript:void(0)' class='link-primary text-decoration-none cursor-pointer' data-bs-target='#loginModal' data-bs-toggle='modal' data-bs-dismiss='modal'>Login</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>";
        //
        return $formModal;
    /*
    }
    */
}