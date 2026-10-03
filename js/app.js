// Module 6 - Laboratory Activity 3
// Student Registration Form with Input Validation

function isValidStudentNumber(value) {
  return /^\d{2}-\d{4}-\d{3}$/.test(String(value).trim());
}

function isValidPassword(value) {
  const password = String(value);
  return password.length >= 8
    && /[A-Z]/.test(password)
    && /\d/.test(password)
    && /[@$!]/.test(password)
    && !/\s/.test(password);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { isValidStudentNumber, isValidPassword };
}

if (typeof document !== "undefined") {
  const form = document.getElementById("registrationForm");

  const fields = {
    fullName: document.getElementById("fullName"),
    studentNumber: document.getElementById("studentNumber"),
    email: document.getElementById("email"),
    mobileNumber: document.getElementById("mobileNumber"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
    course: document.getElementById("course"),
    terms: document.getElementById("terms")
  };

  const errors = {
    fullName: document.getElementById("fullNameError"),
    studentNumber: document.getElementById("studentNumberError"),
    email: document.getElementById("emailError"),
    mobileNumber: document.getElementById("mobileNumberError"),
    password: document.getElementById("passwordError"),
    confirmPassword: document.getElementById("confirmPasswordError"),
    course: document.getElementById("courseError"),
    terms: document.getElementById("termsError")
  };

  const passwordFeedback = document.getElementById("passwordFeedback");
  const successMessage = document.getElementById("successMessage");
  const summary = document.getElementById("registrationSummary");

  function setError(fieldName, message) {
    const field = fields[fieldName];
    const error = errors[fieldName];

    error.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateFullName() {
    const value = fields.fullName.value.trim();

    if (!value) {
      setError("fullName", "Full name is required.");
      return false;
    }

    if (value.length < 2) {
      setError("fullName", "Full name must be at least two characters.");
      return false;
    }

    setError("fullName", "");
    return true;
  }

  function validateStudentNumber() {
    const value = fields.studentNumber.value.trim();

    if (!value) {
      setError("studentNumber", "Student number is required.");
      return false;
    }

    if (!isValidStudentNumber(value)) {
      setError("studentNumber", "Enter a student number in the format 24-1234-123.");
      return false;
    }

    setError("studentNumber", "");
    return true;
  }

  function validateEmail() {
    const value = fields.email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setError("email", "Email address is required.");
      return false;
    }

    if (!emailPattern.test(value)) {
      setError("email", "Enter a valid email address.");
      return false;
    }

    setError("email", "");
    return true;
  }

  function validateMobileNumber() {
    const value = fields.mobileNumber.value.trim();
    const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

    if (!value) {
      setError("mobileNumber", "Mobile number is required.");
      return false;
    }

    if (!mobilePattern.test(value)) {
      setError("mobileNumber", "Enter 09 followed by 9 digits or +639 followed by 9 digits, with no spaces or hyphens.");
      return false;
    }

    setError("mobileNumber", "");
    return true;
  }

  function updatePasswordFeedback() {
    const value = fields.password.value;

    if (!value) {
      passwordFeedback.textContent = "";
      return;
    }

    const requirements = [
      { valid: value.length >= 8, text: "at least 8 characters" },
      { valid: /[A-Z]/.test(value), text: "one uppercase letter" },
      { valid: /\d/.test(value), text: "one digit" },
      { valid: /[@$!]/.test(value), text: "one of @, $, or !" },
      { valid: !/\s/.test(value), text: "no whitespace" }
    ];

    const missing = requirements.filter(item => !item.valid).map(item => item.text);

    passwordFeedback.textContent = missing.length
      ? "Password still needs: " + missing.join(", ") + "."
      : "Password meets all requirements.";
  }

  function validatePassword() {
    const value = fields.password.value;

    if (!value) {
      setError("password", "Password is required.");
      return false;
    }

    if (!isValidPassword(value)) {
      setError("password", "Password must be at least 8 characters, include one uppercase letter, one digit, and one of @, $, or !, with no whitespace.");
      return false;
    }

    setError("password", "");
    return true;
  }

  function validateConfirmPassword() {
    const value = fields.confirmPassword.value;

    if (!value) {
      setError("confirmPassword", "Please confirm your password.");
      return false;
    }

    if (value !== fields.password.value) {
      setError("confirmPassword", "Passwords do not match.");
      return false;
    }

    setError("confirmPassword", "");
    return true;
  }

  function validateCourse() {
    if (fields.course.value !== "BSIT" && fields.course.value !== "BSCS") {
      setError("course", "Please select BSIT or BSCS.");
      return false;
    }

    setError("course", "");
    return true;
  }

  function validateTerms() {
    if (!fields.terms.checked) {
      setError("terms", "You must agree to the terms and conditions.");
      return false;
    }

    setError("terms", "");
    return true;
  }

  function validateAll() {
    return [
      validateFullName(),
      validateStudentNumber(),
      validateEmail(),
      validateMobileNumber(),
      validatePassword(),
      validateConfirmPassword(),
      validateCourse(),
      validateTerms()
    ].every(Boolean);
  }

  function displaySummary() {
    document.getElementById("summaryName").textContent = fields.fullName.value.trim();
    document.getElementById("summaryStudentNumber").textContent = fields.studentNumber.value.trim();
    document.getElementById("summaryEmail").textContent = fields.email.value.trim();
    document.getElementById("summaryMobileNumber").textContent = fields.mobileNumber.value.trim();
    document.getElementById("summaryCourse").textContent = fields.course.value;

    successMessage.textContent = "Registration details validated successfully!";
    summary.hidden = false;
  }

  function clearOutput() {
    successMessage.textContent = "";
    summary.hidden = true;

    document.getElementById("summaryName").textContent = "";
    document.getElementById("summaryStudentNumber").textContent = "";
    document.getElementById("summaryEmail").textContent = "";
    document.getElementById("summaryMobileNumber").textContent = "";
    document.getElementById("summaryCourse").textContent = "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearOutput();

    if (validateAll()) {
      displaySummary();
    }
  });

  fields.password.addEventListener("input", function () {
    updatePasswordFeedback();
    if (fields.password.value) {
      validatePassword();
    }
    if (fields.confirmPassword.value) {
      validateConfirmPassword();
    }
  });

  fields.fullName.addEventListener("blur", validateFullName);

  fields.course.addEventListener("change", validateCourse);
  fields.terms.addEventListener("change", validateTerms);

  fields.studentNumber.addEventListener("blur", validateStudentNumber);
  fields.email.addEventListener("blur", validateEmail);
  fields.mobileNumber.addEventListener("blur", validateMobileNumber);
  fields.confirmPassword.addEventListener("blur", validateConfirmPassword);

  form.addEventListener("reset", function () {
    setTimeout(function () {
      Object.keys(errors).forEach(function (key) {
        setError(key, "");
      });

      passwordFeedback.textContent = "";
      clearOutput();
    }, 0);
  });
}
