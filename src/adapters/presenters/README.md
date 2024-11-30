Transforman los datos de dominio en formatos adecuados para la presentación.
Ejemplo: CompanyPresenter.ts.

Transform domain data into formats suitable for presentation.
Example: CompanyPresenter.ts.

````js
export class CompanyPresenter {
    toDto(company: Company): CompanyDto {
        return {
            id: company.id,
            name: company.name,
            address: company.address,
            phone: company.phone,
            email: company.email,
            website: company.website,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
        };
    }

    toDtoList(companies: Company[]): CompanyDto[] {
        return companies.map((company) => this.toDto(company));
    }

    toActiveDtoList(companies: Company[]): CompanyDto[] {
        return companies
            .filter((company) => company.active)
            .map((company) => this.toDto(company));
    }
}
```markdown
````
