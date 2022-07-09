import {DatabaseProvider} from "../../../../../database-provider";
import {Product, ProductCategory} from "../schemas/product-schema";
import {ProductPhoto} from "../schemas/product-photo-schema";
import {ILike, In} from "typeorm";
import {AgentManager} from "../../agent/manager/agent-manager";
import {Agent} from "../../agent/schemas/agent-schema";

export class ProductManager
{
    databaseProvider: DatabaseProvider;

    agentManager?: AgentManager

    constructor(databaseProvider: DatabaseProvider, agentManager_?: AgentManager)
    {
        this.databaseProvider = databaseProvider;

        this.agentManager = agentManager_;
    }

    getAgentManager(): AgentManager
    {
        if (this.agentManager)
            return this.agentManager
        else throw new Error("!AgentManager");
    }

    setAgentManager(agentManager: AgentManager)
    {
        this.agentManager = agentManager;
    }

    async allProductCategories(): Promise<ProductCategory[]>
    {
        return this.databaseProvider.getDataSource().getRepository(ProductCategory).find({});
    }

    async createCategory(category_name: string)
    {
        return this.databaseProvider.getDataSource().getRepository(ProductCategory).save({category_name: category_name});
    }

    async createPhoto(identifier: string, uri: string)
    {
        return this.databaseProvider.getDataSource().getRepository(ProductPhoto).save({identifier, uri});
    }

    async categoryByName(category_name: string): Promise<ProductCategory>
    {
        let product_category_ = await this.databaseProvider.getDataSource().getRepository(ProductCategory).findOne({where: {category_name: category_name}});

        if (!product_category_)
            throw new Error();
        else
            return product_category_;
    }

    async photoByIdentifier(identifier: string): Promise<ProductPhoto>
    {
        let product_photo_ = await this.databaseProvider.getDataSource().getRepository(ProductPhoto).findOne({where: {identifier: identifier}});

        if (!product_photo_)
            throw new Error();
        else
            return product_photo_;
    }

    async createProduct(product: Product, categories_: string[], photo_identifiers_: string[], agent_username_?: string): Promise<Product>
    {
        product.categories = await Promise.all(categories_.map(value => this.categoryByName(value)));
        product.photos = await Promise.all(photo_identifiers_.map(value => this.photoByIdentifier(value)));

        if (agent_username_)
        {
            let query_result_: Agent[] = await this.getAgentManager().byUsername(agent_username_);

            if (query_result_.length > 0)
                product.agent = query_result_[0];
        }

        return this.databaseProvider.getDataSource().getRepository(Product).save(product);
    }

    async queryProductByProductName(partial_product_name_: string): Promise<Product[]>
    {
        return this.databaseProvider.getDataSource().getRepository(Product).find({
            where: {
                name: ILike("%" + partial_product_name_ + "%")
            }
        });
    }

    async random(): Promise<Product | null>
    {
        let randomProduct_: Product | null = await this.databaseProvider.getDataSource().getRepository(Product).createQueryBuilder("product").orderBy("RANDOM()").limit(1).getOne();

        if (randomProduct_)
            return this.databaseProvider.getDataSource().getRepository(Product).findOne({where: {id: randomProduct_?.id}});
        else
            return null;
    }

    async queryCategoryByName(partial_category_name_: string): Promise<ProductCategory[]>
    {
        return this.databaseProvider.getDataSource().getRepository(ProductCategory).find({
            where: {
                category_name: ILike("%" + partial_category_name_ + "%")
            }

        });
    }

    async productByCategoryName(category_name: string): Promise<Product[]>
    {
        //lazy
        let id_array_ = (await this.databaseProvider.getDataSource().getRepository(Product).createQueryBuilder("p").leftJoinAndSelect("p.categories", "pc").where("pc.category_name = :category_name", {category_name}).getMany()).map(value => value.id);

        //eager
        return this.databaseProvider.getDataSource().getRepository(Product).find({
            where: {
                id: In(id_array_)
            }
        });
    }

    async productByNameLazy(name: string): Promise<Product | null>
    {
        return this.databaseProvider.getDataSource().getRepository(Product).findOne({
            where: {name},
        });
    }

    async productByName(name: string): Promise<Product | null>
    {
        return this.databaseProvider.getDataSource().getRepository(Product).findOne({
            where: {name}, relations: ["ingredients"]
        });
    }

    async all(): Promise<Product[]>
    {
        return this.databaseProvider.getDataSource().getRepository(Product).find({});
    }
}
