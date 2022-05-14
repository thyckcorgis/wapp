require "application_system_test_case"

class FollowsTest < ApplicationSystemTestCase
  setup do
    @follow = follows(:one)
  end

  test "visiting the index" do
    visit follows_url
    assert_selector "h1", text: "Follows"
  end

  test "should create follow" do
    visit follows_url
    click_on "New follow"

    fill_in "Followee", with: @follow.followee_id
    fill_in "Follower", with: @follow.follower_id
    fill_in "Status", with: @follow.status
    click_on "Create Follow"

    assert_text "Follow was successfully created"
    click_on "Back"
  end

  test "should update Follow" do
    visit follow_url(@follow)
    click_on "Edit this follow", match: :first

    fill_in "Followee", with: @follow.followee_id
    fill_in "Follower", with: @follow.follower_id
    fill_in "Status", with: @follow.status
    click_on "Update Follow"

    assert_text "Follow was successfully updated"
    click_on "Back"
  end

  test "should destroy Follow" do
    visit follow_url(@follow)
    click_on "Destroy this follow", match: :first

    assert_text "Follow was successfully destroyed"
  end
end
