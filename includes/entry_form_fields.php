
 <table>
   <tr>
     <td>
       <label for="expression">Expression: </label>
     </td>
     <td>
       <input type="text" name="expression" value="<?php echo $expression;?>">
     </td>
   </tr>
   <tr>
     <td>
       <label for="reading">Reading: </label>
     </td>
     <td>
       <input type="text" name="reading" value="<?php echo $reading;?>">
     </td>
   </tr>
   <tr>
     <td>
       <label for="meaning">Meaning: </label>
     </td>
     <td>
       <input type="text" name="meaning" value="<?php echo $meaning;?>">
     </td>
   </tr>
   <tr>
     <td>
       <label for="list">List: </label>
     </td>
     <td>
       <input type="text" name="list" value="<?php echo $list;?>">
     </td>
   </tr>
 </table>

 <input type="hidden" name="id" value="<?php echo $id;?>">

 <input type="submit" value="Submit">
