const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const profileController = require("../../Controllers/profileController");
const { check, validationResult } = require("express-validator");


// @route Get   api/Profile/me
//@description  Get current users profile
//@access       Private
router.get("/me", auth, profileController.getProfile);

// @route       Post   api/profile
//@description  create or update Profile
//@access       Private

router.post("/", [
  auth,
  [
    check("status", "status is required").not().isEmpty(),
    check("skills", "skills is required").not().isEmpty(),
  ],
  profileController.createUserProfile
]);


// @route       GET   api/profile
//@description  get profile by userID
//@access       Public
router.get("/", profileController.getAllProfiles);


// @route       GET   api/profile/user/:user_id
//@description  getAllProfiles
//@access       Public
router.get("/user/:id", profileController.getProfileByUserId);


// @route       DELETE  api/profile
//@description  Delete profile, user and post 
//@access       private

router.delete("/", auth,  profileController.deleteUser);

// @route       PUT  api/profile/experience
//@description  add profile experience 
//@access       private

router.put('/experience',
 auth,
 [
     check('title', 'Title Is Required').not().isEmpty(),
     check('company', 'company Is Required').not().isEmpty(),
     check('from', 'From date Is Required').not().isEmpty()
 ],
 profileController.addExperience)

// @route       DELETE api/profile/experience/:exp_ID
//@description  delete experience from profile
//@access       private

router.delete(
    '/experience/:exp_id',
    auth,
    profileController.deleteExp)


// @route       PUT  api/profile/education
//@description  add profile education 
//@access       private

router.put('/education',
 auth,
 [
     check('school', 'School Is Required').not().isEmpty(),
     check('degree', 'degree Is Required').not().isEmpty(),
     check('fieldofstudy', 'fieldofstudy Is Required').not().isEmpty(),
     check('from', 'From date Is Required').not().isEmpty()
 ],
 profileController.addEdu)

// @route       DELETE api/profile/education/:exp_ID
//@description  delete education from profile
//@access       private

router.delete(
    '/education/:edu_id',
    auth,
    profileController.deleteEdu)



// @route       GET api/profile/github/:username
//@description  get user repos from github
//@access       public

router.get('/github/:username',
    profileController.github
)

  

module.exports = router;
