# test数据库文档

<a name="返回顶部"></a>

## 大纲

* [admin](#admin)

* [classroom](#classroom)

* [parent_info](#parent_info)

* [sys_req_log](#sys_req_log)

* [user](#user)

## admin[↑](#返回顶部)<a name="admin"></a>

> 表注释: 管理员表

|字段|类型|空|默认值|EXTRA|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|
|admin_id|int(11)|NO||auto_increment|主键|
|account|varchar(255)|YES|||邮箱|
|pwd|varchar(255)|NO|||密码|
|status|tinyint(4)|NO|1||1:正常 -1:禁用|
|created_at|datetime|NO|||创建时间|
|updated_at|datetime|NO|||更新时间|
|deleted_at|datetime|YES||||

**索引**

|键名|类型|唯一|字段|基数|排序规则|空|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|PRIMARY|BTREE|YES|admin_id|0|A|NO||

## classroom[↑](#返回顶部)<a name="classroom"></a>

|字段|类型|空|默认值|EXTRA|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(10) unsigned|NO||auto_increment||
|grade|tinyint(3) unsigned|NO||||
|prom|tinyint(3) unsigned|NO||||
|created_at|datetime|NO|CURRENT_TIMESTAMP|||
|updated_at|datetime|NO|CURRENT_TIMESTAMP|||
|deleted_at|datetime|YES||||

**索引**

|键名|类型|唯一|字段|基数|排序规则|空|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|PRIMARY|BTREE|YES|id|0|A|NO||

## parent_info[↑](#返回顶部)<a name="parent_info"></a>

|字段|类型|空|默认值|EXTRA|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(10) unsigned|NO||auto_increment||
|username|varchar(20)|NO||||
|tel|varchar(20)|NO||||
|user_id|int(10) unsigned|NO||||
|created_at|datetime|NO|CURRENT_TIMESTAMP|||
|updated_at|datetime|NO|CURRENT_TIMESTAMP|||
|deleted_at|datetime|YES||||

**索引**

|键名|类型|唯一|字段|基数|排序规则|空|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|PRIMARY|BTREE|YES|id|0|A|NO||
|idx_user_id|BTREE|NO|user_id|0|A|NO||

## sys_req_log[↑](#返回顶部)<a name="sys_req_log"></a>

|字段|类型|空|默认值|EXTRA|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|
|req_log_id|int(11)|NO||auto_increment|主键|
|admin_id|int(11)|NO|||用户id|
|ip|varchar(255)|NO|||请求ip地址|
|param|text|NO|||请求参数|
|action|varchar(100)|NO|||请求路径|
|method|varchar(15)|NO|||请求方式|
|status|int(11)|NO|||返回状态值|
|consume_time|int(11)|NO|0||消耗时间|
|created_at|datetime(6)|NO|CURRENT_TIMESTAMP(6)||创建时间|

**索引**

|键名|类型|唯一|字段|基数|排序规则|空|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|PRIMARY|BTREE|YES|req_log_id|0|A|NO||
|idx_admin_id|BTREE|NO|admin_id|0|A|NO||

## user[↑](#返回顶部)<a name="user"></a>

|字段|类型|空|默认值|EXTRA|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(10) unsigned|NO||auto_increment||
|first_name|varchar(20)|NO||||
|last_name|varchar(20)|NO||||
|classroom_id|int(10) unsigned|NO||||
|created_at|datetime|NO|CURRENT_TIMESTAMP|||
|updated_at|datetime|NO|CURRENT_TIMESTAMP|||
|deleted_at|datetime|YES||||

**索引**

|键名|类型|唯一|字段|基数|排序规则|空|注释|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|PRIMARY|BTREE|YES|id|0|A|NO||
|user_classroomId_fkey|BTREE|NO|classroom_id|0|A|NO||
