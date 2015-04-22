/**
 * Created by ori22_000 on 4/22/2015.
 */
var fs = require('fs');
var file_deserialized_data = JSON.parse(fs.readFileSync('C:\\Users\\ori22_000\\Google Drive\\IDC\\Spring2015\\Cloud\\files_examples\\ex1.json', 'utf8'));

console.log( calculate_grade_from_object(file_deserialized_data));


//
//var grades_average = 0;
//var number_of_elements = file_deserialized_data["Grades"].length;
//for (key in file_deserialized_data["Grades"])
//{
//    for(key_j in file_deserialized_data["Grades"][key])
//    {
//        grades_average = grades_average + file_deserialized_data["Grades"][key][key_j]/number_of_elements;
//    }
//}
//



function calculate_grade_from_object(deser_object)
{
    var grades_average = 0;
    var number_of_elements = deser_object["Grades"].length;
    for (key in deser_object["Grades"])
    {
        for(key_j in deser_object["Grades"][key])
        {
            grades_average = grades_average + deser_object["Grades"][key][key_j]/number_of_elements;
        }
    }
    return grades_average;
}