# crate-version

This is a Github action, you can use it to extract your Rust crate version. Read more about those here:
[https://developer.github.com/actions/](https://developer.github.com/actions/)

## Usage

`workflow.yml`

```yaml
- name: Crate Version
  id: crate-version
  uses: colathro/crate-version@1.0.0
  with:
    file: "./Cargo.toml"
```

### Arguments

All arguments are of type string.

| Name | Required | Description                    |
| ---- | -------- | ------------------------------ |
| file | Yes      | The relative path of toml file |

### Cargo.toml Example

```toml
[package]
name = "images"
version = "0.1.0"
edition = "2021"

[dependencies]
rusoto_s3 = "0.48.0"
rusoto_core = "0.48.0"
rusoto_signature = "0.48.0"
rusoto_credential = "0.48.0"
async-trait = "0.1.53"
```

Output here would be "0.1.0"

### Using the output

```
name: Build My Thing
on: push
jobs:
  Build:
    runs-on: ubuntu-latest
    steps:
      - id: checkout
        uses: actions/checkout@v3

      - name: Crate Version
        id: crate-version
        uses: colathro/crate-version@1.0.0
        with:
          file: "./Cargo.toml"
      - name: Use Version Output
        run: echo ${{ steps.crate-version.outputs.version }}
```

## Development

### Dependencies

`npm install`

`npm i -g @vercel/ncc`

### Testing

`yarn test`

### Building

`ncc build index.js --license licenses.txt`

After building check in dist/index.js.
