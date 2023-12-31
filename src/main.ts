import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import appConfig from "./config/app.config"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()

	const config = new DocumentBuilder()
		.setTitle("CiSwap Server")
		.setDescription("The CiSwap Server is responsible for handling request from CiSwap client.")
		.setVersion("1.0")
		.build()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup("/", app, document, {
		swaggerOptions: { defaultModelsExpandDepth: -1 }
	})
  
	await app.listen(appConfig().port || 3001)
}
bootstrap()
