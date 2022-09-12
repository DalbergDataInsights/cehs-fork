### Guidelines on creating a template:

---

The template has 4 groups of variables that can be inputted. These are:

1. Static i.e., fixed variables. (District, recipient's name, biostatistician's name, number of indicators)
2. Dynamic i.e., These are the date variables in the template. (Reporting month, data extraction date, the month that will be featured in the following report, month in which the following report will be shared)
3. Image - This group refers to the visualizations on the specified indicators. It consists of 3 types.
   > **line**
   > : line graphs showing the trends of a specific indicator at district level.  
   > **bar**
   > : horizontal bar graphs showing the contribution of the top 10 facilities during the reporting month.  
   > **reporting**
   > : line graphs comparing the percentages of facilities reporting on their 105:1 form, and percentage of reporting facilities that reported a value of one or above for a specific indicator in a specific district.
4. Title - This group consist of titles for each visualization. They are implemented in the template similar to the figure captions i.e., below the respective visualization.

#### Defining a variable:

Creating a variable takes in the **_group_**, **_type_** (if any) followed by the **_name of the variable_**. For the variables specific to an indicator the name would be replaced by the indicator id. The syntax is therefore: **_group_type_name_** or **_group_type_indicatorid_** for indicator specific variables.

To insert a variable, wrap it in double curly brackets and ensure no spaces between the variable name. Spaces should be filled with the underscore symbol.


Example:

> recipients name &rarr; {{static_recipients_name}}

> (_where the group is ***static*** and the variable name is ***recipients_name***_)

Following the above rule, the static and dynamic variables that can be set for parsing include:

| Variable Description                                                                                |
| --------------------------------------------------------------------------------------------------- |
| Name of district (group: static, name:district) &rarr; {{static_district}}                          |
| Name of the recipient  &rarr; {{static_recipients_name}}                                            |
| Name of the biostatistician &rarr; {{static_biostatistician_name}}                                  |
| Number of indicators &rarr; {{static_number_of_indicators}}                                         |
| Reporting month (group:dynamic, name:reporting_month) &rarr; {{dynamic_reporting_month}}            |
| The date of data extraction &rarr; {{dynamic_extraction_date}}                                      |
| The month that will be featured in the following report &rarr; {{dynamic_following_reporting_date}} |
| The month in which the following report will be published &rarr; {{dynamic_future_report_date}}     |

#### Images

To create an image variable name for a specific indicator, the first part of the variable name has to be the group i.e., ***image***. Followed by the type of visualization i.e., ***line, bar or reporting***, then the ***indicator id*** (the numerator elements id). All separated by the underscore symbol.
Using 1st ANC Visits as an example:

> for line visualization: {{image_line_Q9nSogNmKPt}}  
> for bar visualization: {{image_bar_Q9nSogNmKPt}}  
> for reporting visualization: {{image_reporting_Q9nSogNmKPt}}

To set the variable title for an indicator, similar to the image above specify the group i.e., ***title*** followed by the type of visualization i.e., ***line, bar or reporting***,then the ***indicator id*** separated by the underscore symbol. Using Malaria cases as an example:

> {{title_line_fUflbWWhouR}}

If an indicator e.g. OPD attendance, requires multiple data elements use the format:

> {{image_line_sv6SeKroHPV_sQ4EexvvhVe}}

---
