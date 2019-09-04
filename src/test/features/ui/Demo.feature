Feature: Demo
  
  @ui
  Scenario: Programming Cost Lookup search shows the result
    When I select 'Programming Cost Lookup' option from 'Programming services' menu
      And I select '1' option after search by 'pic' on Programming Cost Lookup remembering item name as 'search'
    Then Result for 'search' is shown
      And Step 1 'Part Cost' label is shown
      And Step 2 'Low-Cost Programming Services' label is shown
      And Step 3 'Upload Code' label is shown
      And Step 1 table has data
      And Step 2 table has data
      And Step 3 has enabled Upload button