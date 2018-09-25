<template>
  <div class="first">
    <el-row>
      <el-button type="primary" icon="el-icon-edit" size="medium" round @click="add">添加</el-button>
      <el-button type="danger" size="medium" icon="el-icon-delete" round>删除</el-button>
    </el-row>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="类别"
        width="160"
        align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        width="240"
        align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        width="240"
        align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        width="240"
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布源"
        width="240"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column 
      label="操作"
      align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
    <!-- 添加窗口-->
    <el-dialog title="添加" :visible.sync="dialogFormAddVisible" width="35%">
      <el-form :model="formAdd">
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="formAdd.region" placeholder="请选择活动区域" style="width:350px;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="formAdd.name" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth">
          <el-input v-model="formAdd.date" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="发布源" :label-width="formLabelWidth">
          <el-input v-model="formAdd.source" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAddVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑窗口 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="formEdit">
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="formEdit.region" placeholder="请选择活动区域" style="width:350px;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="formEdit.name" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth">
          <el-input v-model="formEdit.date" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="发布源" :label-width="formLabelWidth">
          <el-input v-model="formEdit.source" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
  </div>
</template>

<script>
export default {
  name: 'first',
  data () {
    return {
      //表格数据
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        //编辑窗口
        dialogFormVisible: false,
        dialogFormAddVisible :false,
        formEdit: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formAdd: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        currentPage: 1, //当前页
        pageSize:5,     //每页设置数量
        listNum:10,      //分页总条数
    }
  },
  methods: {
    //表格添加
    add(){
      this.dialogFormAddVisible = true;
    },
    //表格编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
    },
    //表格删除记录
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });          
      });
    },
    //切换分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //点击当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.first{
  // height: 100%;
  .el-row{
    margin-bottom:20px;
  }
  .block{
    text-align:right;
    margin:100px 100px 0 0;
  }
}
</style>
