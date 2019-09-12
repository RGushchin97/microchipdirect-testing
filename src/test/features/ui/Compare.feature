Feature: Compare

  @ui
  Scenario: Comparing shows results
#    When I select 'Ultrasound Products' from 'Analog' card footer
    When I select 'Analog' card
      And I select 'Depletion - Mode N-Channel' from 'High Voltage Interface' table card
      And I remember items names list as 'full list'
      And I select '1' item with cost '$0.27' from results table remembering item name as 'item 1'
      And I select '1' item with cost '$0.37' from results table remembering item name as 'item 2'
      And I click button 'Compare'
    Then Only '2' items are in table
      And Item 'item 1' is in table
      And Item 'item 2' is in table
    When I click button 'Show Full List'
      Then List of items names 'full list' is shown
      And Button 'Compare' is available

