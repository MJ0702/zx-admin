<template>
  <div class="first">
    <el-row>
      <el-button type="primary" icon="el-icon-edit" size="medium" round @click="dialogFormAddVisible = true">添加</el-button>
      <!--<el-button type="danger" size="medium" icon="el-icon-delete" round>删除</el-button>-->
    </el-row>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        label="类别"
        width="160"
        align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        width="240"
        align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        width="240"
        align="center">
        <template slot-scope="scope">
          <span v-html="matchReg(scope.row.content)" style="margin-left: 10px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        width="240"
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.publish_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布源"
        width="240"
        align="center">
        <template slot-scope="scope">
          <span style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{{ scope.row.source }}</span>
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
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        v-loading.fullscreen.lock="fullscreenLoading"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="listNum">
      </el-pagination>
    </div>
    <!-- 添加窗口-->
    <el-dialog title="添加" :visible.sync="dialogFormAddVisible" width="30%">
      <el-form :model="formAdd" :rules="rules" ref="formAdd" class="demo-formAdd">
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="formAdd.type" placeholder="请选择活动区域" style="width:350px;">
            <el-option label="政策动态" value="政策动态"></el-option>
            <el-option label="公告信息" value="公告信息"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="formAdd.title" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formAdd.publish_time"
            type="date"
            placeholder="选择日期"
            style="width:350px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布源" :label-width="formLabelWidth">
          <el-input v-model="formAdd.source" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
            v-model="formAdd.content" style="width:350px;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑窗口 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="formEdit">
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="formEdit.type" placeholder="请选择活动区域" style="width:350px;">
            <el-option label="政策动态" value="政策动态"></el-option>
            <el-option label="公告信息" value="公告信息"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="formEdit.title" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formEdit.publish_time"
            type="date"
            placeholder="选择日期"
            style="width:350px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布源" :label-width="formLabelWidth">
          <el-input v-model="formEdit.source" autocomplete="off" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入内容"
            v-model="formEdit.content" style="width:350px;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit_confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'first',
  created() {
    // console.log(this);
    this.$nextTick(() => {
      let model = this;
      // 配置当前页的路由
      // this.$router.push({ path: 'home/first', query: { page: 1}})
      //请求分页总数据
      // this.$store.commit('change_page_list', {page:1,rows:10});
      this.chage_page(1,10);
    })
  },
  data () {
    return {
      //表格数据
      tableData: [],
      //编辑窗口
      dialogFormVisible: false,
      dialogFormAddVisible :false,
      formEdit: {
        id:'',
        title: '',
        type: '',
        publish_time: '',
        // delivery: false,
        source: '',
        content: ''
      },
      formAdd: {
        title: '',
        type: '',
        publish_time: '',
        // delivery: false,
        source: '',
        content: ''
      },
      //校验
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请输来源', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      currentPage: 1, //当前页
      pageSize:10,     //每页设置数量
      listNum:10,      //分页总条数
      publish_time:new Date(),  //发布时间
      fullscreenLoading: false  //加载中
    }
  },
  methods: {
    //打开编辑窗口
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialogFormVisible = true;
      this.formEdit.type = row.type;
      this.formEdit.title = row.title;
      this.formEdit.publish_time = row.publish_time;
      this.formEdit.source = row.source;
      this.formEdit.content = this.dislodge_tag(row.content);
      // this.add_edit_list(edit,postData);
      // console.log(row);
      this.formEdit.id = row.id;
    },
    //表格删除记录
    handleDelete(index, row) {
      // console.log(index, row);
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
    //点击当前页切换分页
    handleCurrentChange(val) {
      this.fullscreenLoading = true;
      console.log(`当前页: ${val}`);
      this.chage_page(val,10);
    },
    //分页跳转
    chage_page(page,rows){
      let model = this;
      let arr = [];
      this.$http.get('/zxiao/API/findZxiaoAll', {
        params: {
          page:page,
          rows:rows
        }
      })
      .then(function (response) {
        console.log(response);
        let total = response.data.data.total;
        let len = parseInt(response.data.data.rows);
        model.listNum = len;
        for(let i = 0;i<total.length;i++){
          arr.push(total[i]);   
        }
        model.listNum = len;
        model.tableData = arr; 
        console.log(model);
        model.fullscreenLoading = false;
      })
      .catch(function (error) {
        model.fullscreenLoading = false;
        console.log(error);
      });
    },
    //去掉标签
    dislodge_tag(val){
      let reg=/<\/?.+?\/?>/g;
      return val.replace(reg,'');
    },
    //添加、修改表格数据
    add_edit_list(postData){
      this.$http({
          method: 'post',
          url:'/zxiao/API/Operator',
          data:postData
      }).then((res)=>{
        console.log(res);
        let json = res.data;
        // if(json.code == '-1'){
        //   model.$message.error('账号不存在');
        // }else{
        //   model.$router.push('/home/first');
        // } 
      }).catch(function (error) {
        model.$message.error('添加失败！');
        console.log(error);
      });
    },
    //确认添加
    add_confirm(){
      this.dialogFormAddVisible = false
      let postData = this.$qs.stringify({
          type:this.formAdd.type,
          title:this.formAdd.title,
          publish_time:this.formAdd.publish_time,
          source:this.formAdd.source,
          content:this.formAdd.content     
      });
      add_edit_list(postData);
    },
    //确认编辑
    edit_confirm(){
      this.dialogFormAddVisible = false
      let postData = this.$qs.stringify({
          id:this.this.formEdit.id,
          type:this.formEdit.type,
          title:this.formEdit.title,
          publish_time:this.formEdit.publish_time,
          source:this.formEdit.source,
          content:this.formEdit.content     
      }); 
      add_edit_list(postData);
    }
  },
  computed:{
    ...mapState([
      'page_list'
    ])
  },
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
