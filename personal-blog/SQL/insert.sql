INSERT INTO T_ARTICLE(
	ID,
	TITLE,
	AUTHOR,
	READING_VOLUME,
	CALSSIFY,
	PREVIEW_CONTENT,
	CREATE_TIEM,
	RECOMMEND) VALUES (
	12345,'标题测试','作者测试',183,1,'预览<br>测试',NOW(),1
	);

INSERT INTO T_ARTICLE_CONTENT (MALE_ID, CONTENT) VALUES (12345, '附表内容测试');

INSERT INTO T_COMMENT (ARTICLE_ID, COM_CONTENT, COM_TIME,COMMENTATOR_NAME) VALUES (12345, '评论内容测试', NOW(),'评论者测试');