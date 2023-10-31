#include <iostream>
#include <string>
using namespace std;

class node
{
    string key;
    string mean;
    node *right;
    node *left;
    int ht;
    friend class AVLtree;

public:
    node(string k, string m)
    {
        this->key = k;
        this->mean = m;
        this->right = NULL;
        this->left = NULL;
        this->ht = 1;
    }
};

class AVLtree
{

public:
    node *root;
    AVLtree()
    {
        this->root = NULL;
    }

    int height(node *n)
    {
        if (n == NULL)
        {
            return 0;
        }
        return n->ht;
    }

    node *Rrotate(node *r)
    {
        node *newr = r->left;
        r->left = newr->right;
        newr->right = r;
        r->ht = max(height(r->left), height(r->right)) + 1;
        newr->ht = max(height(newr->left), height(newr->right)) + 1;
        return newr;
    }

    node *Lrotate(node *r)
    {
        node *newr = r->right;
        r->right = newr->left;
        newr->left = r;
        r->ht = max(height(r->left), height(r->right)) + 1;
        newr->ht = max(height(newr->left), height(newr->right)) + 1;
        return newr;
    }

    int BalanceFactor(node *r)
    {
        if (r == NULL)
        {
            return 0;
        }
        return height(r->left) - height(r->right);
    }

    node *insert(node *r, string k, string m)
    {
        if (r == NULL)
        {
            node *newnode = new node(k, m);
            return newnode;
        }
        if (k < r->key)
        {
            r->left = insert(r->left, k, m);
        }
        else if (k > r->key)
        {
            r->right = insert(r->right, k, m);
        }
        else
        {
            return r;
        }

        r->ht = max(height(r->left), height(r->right)) + 1;
        int bf = BalanceFactor(r);

        // LL
        if ( bf == 2 && k < r->left->key)
        {
            return Rrotate(r);
        }

        // RR
        if (bf == -2 && k > r->right->key)
        {
            return Lrotate(r);
        }

        // LR
        if (bf == 2 && k > r->left->key)
        {
            r->left = Lrotate(r->left);
            return Rrotate(r);
        }

        // RL
        if (bf == -2 && k < r->right->key)
        {
            r->right = Rrotate(r->right);
            return Lrotate(r);
        }

        return r;
    }

    node *minNode(node *r)
    {
        node *temp = r;
        while (temp->left != NULL)
        {
            temp = temp->left;
        }
        return temp;
    }

    node *deletion(node *r, string k)
    {
        if (r == NULL)
        {
            return r;
        }
        if (k < r->key)
        {
            r->left = deletion(r->left, k);
        }
        else if (k > r->key)
        {
            r->right = deletion(r->right, k);
        }
        else
        {
            if (r->left == NULL || r->right == NULL)
            {
                node *temp;
                if (r->left)
                {
                    temp = r->left;
                }
                else
                {
                    temp = r->right;
                }
                if (temp == NULL)
                {
                    temp = r;
                    r = NULL;
                }
                else
                {
                    root->key = temp->key;
                }
                delete temp;
            }
            else
            {
                node *min = minNode(r->right);
                r->key = min->key;
                r->mean = min->mean;
                r->right = deletion(r->right, min->key);
            }
        }

        if (r == NULL)
        {
            return r;
        }

        r->ht = max(height(r->left), height(r->right)) + 1;
        int bf = BalanceFactor(r);

        // LL
        if (bf == 2 && BalanceFactor(r->left) > 0)
        {
            return Rrotate(r);
        }

        // RR
        if (bf == -2 && BalanceFactor(r->right) <= 0)
        {
            return Lrotate(r);
        }

        // LR
        if (bf == 2 && BalanceFactor(r->right) < 0)
        {
            r->left = Lrotate(r->left);
            return Rrotate(r);
        }

        // RL
        if (bf == -2 && BalanceFactor(r->right) > 0)
        {
            r->right = Rrotate(r->right);
            return Lrotate(r);
        }

        return r;
    }

    node *search(string s)
    {
        node *temp = root;
        while (temp != NULL)
        {
            if (temp->key == s)
            {
                return temp;
            }
            else if (temp->key > s)
            {
                temp = temp->left;
            }
            else
            {
                temp = temp->right;
            }
        }
    }

    int cmp(string s)
    {
        node *temp = root;
        int count = 0;
        while (temp != NULL)
        {
            count++;
            if (temp->key == s)
            {
                return count;
            }
            else if (temp->key > s)
            {
                temp = temp->left;
            }
            else
            {
                temp = temp->right;
            }
        }

        return -1;
    }

    void update(string k, string newm)
    {
        node *temp = search(k);
        temp->mean = newm;
    }

    void inorder(node *r)
    {
        if (r == NULL)
        {
            return;
        }
        inorder(r->left);
        cout << r->key << "   :" << r->mean << endl;
        inorder(r->right);
    }

    void descending(node *r)
    {
        if (r == NULL)
        {
            return;
        }
        descending(r->right);
        cout << r->key << "   :" << r->mean << endl;
        descending(r->left);
    }

    void preorder(node *r)
    {
        if (r == NULL)
        {
            return;
        }
        cout << r->key << "   :" << r->mean << endl;
        preorder(r->left);
        preorder(r->right);
    }
    void postorder(node *r)
    {
        if (r == NULL)
        {
            return;
        }
        postorder(r->left);
        postorder(r->right);
        cout << r->key << "   :" << r->mean << endl;
        
    }
    void addNode(string k, string m)
    {
        root = insert(root, k, m);
    }
    void deleNode(string n)
    {
        root = deletion(root, n);
    }
};

int main()
{
    AVLtree a;
    int n;
    string k, m;
    while (true)
    {
        cout << "Choose the following" << endl;
        cout << "1. Add word" << endl;
        cout << "2. Delete word" << endl;
        cout << "3. Update meaning" << endl;
        cout << "4. Display" << endl;
        cout << "5. Search a word" << endl;
        cout << "6. Exit" << endl;
        int opt;
        cout << "Enter your choice : ";
        cin >> opt;
        cout << endl;
        switch (opt)
        {
        case 1:
            cout << "Enter the no. of words to add :";
            cin >> n;
            for (int i = 0; i < n; i++)
            {
                string word, meaning;
                cout << "Enter the word : ";
                cin >> word;
                cout << "Enter it's meaning : ";
                cin >> meaning;
                a.addNode(word, meaning);
            }
            cout << endl;
            break;
        case 2:
            cout << "Enter the word to delete : ";
            cin >> k;
            a.deleNode(k);
            cout << endl;
            cout << "Word deleted " << endl;
            cout << endl;
            break;
        case 3:
            cout << "Enter the word to update : ";
            cin >> k;
            cout << "Entet it's new meaning : ";
            cin >> m;
            a.update(k, m);
            cout << endl;
            break;
        case 4:
            cout << "a. Ascending " << endl;
            cout << "b. Descending " << endl;
            cout << "c .Preorder" << endl;
            cout << "d. Postorder " << endl;
            cout << "Enter your choice : ";
            cin >> k;

            if (k == "a")
            {
                cout << "Ascending : " << endl;
                cout << "Word " << "Meaning " << endl;
                a.inorder(a.root);
            }
            else if (k == "b")
            {
                cout << "Descending : " << endl;
                cout << "Word "
                     << "Meaning " << endl;
                a.descending(a.root);
            }
            else if (k == "c")
            {
                cout << "Preorder : " << endl;
                cout << "Word "
                     << "Meaning " << endl;
                a.preorder(a.root);
            }
            else if (k == "d")
            {
                cout << "Postorder :" << endl;
                cout << "Word "
                     << "Meaning " << endl;
                a.postorder(a.root);
            }
            cout << endl;
            break;
        case 5:
            cout << "Enter the word to search :";
            cin >> k;
            n = a.cmp(k);
            if (n == -1)
            {
                cout << "Word is not present" << endl;
            }
            else
            {
                cout << "No. of comparisons required : " << n << endl;
                cout << endl;
            }
            cout<<endl;
            break;
        case 6:
            return 0;
        }
    }
    return 0;
}